# -*- coding: utf-8 -*-
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from datetime import datetime
import pytz
import base64
import pickle
import os.path
import traceback
import logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s.%(msecs)03d %(levelname)s:\t%(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)


class Gmail:

    def __init__(self, email="3geniuses2020@gmail.com", cred_file="client_secret.json"):
        self.scopes = [
            'https://www.googleapis.com/auth/gmail.readonly',
        ]
        self.email = email
        self.cred_file = cred_file

    def credentials_check(self):
        try:
            creds = None

            # The file token.pickle contains the user access token.
            # Check if it exists
            if os.path.exists('token.pickle'):

                # Read the token from the file and store it in the variable creds
                with open('token.pickle', 'rb') as token:
                    creds = pickle.load(token)

            # If credentials are not available or are invalid, ask the user to log in.
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        'credentials.json', self.scopes)
                    creds = flow.run_local_server(port=0)

                # Save the access token in token.pickle file for the next run
                with open('token.pickle', 'wb') as token:
                    pickle.dump(creds, token)
            return creds
        except:
            logger.error(traceback.print_exc())
            logger.error("Error: credentails_check()")
            return None

    def get_email(self):
        creds = self.credentials_check()
        if not creds:
            return {"success": False, "message": "Fail to get email"}
        service = build('gmail', 'v1', credentials=creds,
                        cache_discovery=False)

        # Call the Gmail API
        all_email_data = []
        results = service.users().messages().list(
            userId=self.email, q="category:primary", maxResults=10).execute()
        messages = results.get("messages")
        for msg in messages:
            message_received = service.users().messages().get(
                userId=self.email, id=msg["id"]).execute()
            try:
                payload = message_received["payload"]
                headers = payload["headers"]
                snippet = message_received["snippet"]
                for d in headers:
                    if d["name"] == "Subject":
                        subject = d["value"]
                    if d["name"] == "From":
                        sender = d["value"]
                unix_time = int(message_received["internalDate"]) / 1000
                tz = pytz.timezone('Asia/Hong_Kong')
                date = datetime.fromtimestamp(
                    unix_time, tz).strftime('%Y-%m-%d %H:%M:%S')

                if "data" in payload['body']:
                    data = payload['body']['data']
                elif "data" in payload['parts'][1]['body']:
                    data = payload['parts'][1]['body']['data']
                elif "data" in payload["parts"][0]["parts"][1]['body']:
                    data = payload["parts"][0]["parts"][1]['body']['data']
                data = data.replace("-", "+").replace("_", "/")
                decoded_data = base64.b64decode(data)
                email_data = {
                    "subject": subject,
                    "summary": snippet,
                    "from": sender,
                    "body": decoded_data.decode("utf-8"),
                    "date": date
                }
                logger.debug(f"Body: {decoded_data}")
                all_email_data.append(email_data)
            except:
                print(message_received)
                print(traceback.print_exc())
                pass
        return {"success": True, "data": all_email_data}


if __name__ == "__main__":
    email_api = Gmail()
    data = email_api.get_email()
    print(data)
