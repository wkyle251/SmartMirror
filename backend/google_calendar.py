# -*- coding: utf-8 -*-
import requests
import pickle
import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
import os.path
import traceback
import logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s.%(msecs)03d %(levelname)s:\t%(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)


class Google_calendar:

    def __init__(self, email="3geniuses2020@gmail.com", cred_file="client_secret.json"):
        self.scopes = ['https://www.googleapis.com/auth/calendar.readonly',
                       "https://www.googleapis.com/auth/calendar"]
        self.email = email
        self.cred_file = cred_file

    def credentials_check(self):
        try:
            creds = service_account.Credentials.from_service_account_file(
                self.cred_file, scopes=self.scopes)
            return creds
        except:
            logger.error("Error: credentails_check()")
            return None

    def get_event(self):
        # Call the Calendar API
        results = {
            "events": [],
            "holiday": []
        }
        creds = self.credentials_check()
        if not creds:
            return {"success": False, "message": "Fail to get event"}
        service = build('calendar', 'v3', credentials=creds,
                        cache_discovery=False)
        first_day = datetime.datetime(datetime.datetime.today(
        ).year, 1, 1, 0, 0, 0)
        last_day = datetime.datetime(datetime.datetime.today(
        ).year, 12, 31, 23, 59, 59)
        last_day = last_day.strftime("%Y-%m-%dT%H:%M:%SZ")
        first_day = first_day.strftime("%Y-%m-%dT%H:%M:%SZ")
        print(last_day)
        logger.info('Getting the upcoming 10 events')
        events_result = service.events().list(calendarId=self.email,
                                              maxResults=100, singleEvents=True, orderBy='startTime').execute()
        holiday_result = service.events().list(
            calendarId="zh.hong_kong#holiday@group.v.calendar.google.com", timeMin=first_day, timeMax=last_day).execute()
        events = events_result.get('items', [])
        holiday = holiday_result.get('items', [])
        results["events"] = events
        results["holiday"] = holiday
        return {"success": True, "data": results}


if __name__ == "__main__":
    cal = Google_calendar()
    events = cal.get_event()
    print(events)
