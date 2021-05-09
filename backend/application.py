# -*- coding: utf-8 -*-
import json
from flask import Flask, request, Response
from flask_cors import CORS
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from news import News_api
from google_calendar import Google_calendar
from music import Fetch_music
from gmail import Gmail

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", logger=True,
                    engineio_logger=True, async_mode="threading")


@app.route('/', methods=["GET"])
def hello():
    return "app is running", 200

# For trigger event


@socketio.on('connect', namespace='/google-assistant')
def connect():
    join_room("google-assistant")


@app.route("/action", methods=["GET"])
def action():
    args = request.args.get("event")
    args_type = request.args.get("type")
    action_data = {
        "event": args_type,
        "action": "",
    }
    if args_type == "swap_page":
        if args == "HOMEPAGE":
            action_data["action"] = "HOMEPAGE"
        if args == "CALENDAR":
            action_data["action"] = "CALENDAR"
        if args == "EMAIL":
            action_data["action"] = "EMAIL"

    elif args_type == "play_music":
        if args == "PLAY_SONG":
            action_data["action"] = "PLAY_SONG"
        if args == "PAUSE_SONG":
            action_data["action"] = "PAUSE_SONG"
        if args == "NEXT_SONG":
            action_data["action"] = "NEXT_SONG"
        if args == "PREVIOUS_SONG":
            action_data["action"] = "PREVIOUS_SONG"

    elif args_type == "check_email":
        if args == "FIRST_EMAIL":
            action_data["action"] = "FIRST_EMAIL"
        if args == "SECOND_EMAIL":
            action_data["action"] = "SECOND_EMAIL"
        if args == "THIRD_EMAIL":
            action_data["action"] = "THIRD_EMAIL"
        if args == "FOURTH_EMAIL":
            action_data["action"] = "FOURTH_EMAIL"
        if args == "FIFTH_EMAIL":
            action_data["action"] = "FIFTH_EMAIL"

    else:
        return {"success": False, "message": "Cannot find action type"}, 200

    emit('google-assistant-action', json.dumps(action_data),
         room="google-assistant", namespace='/google-assistant')

    return {"success": True, "data": json.dumps(action_data)}, 200

# For backend service


@app.route("/get-news", methods=["GET"])
def get_news():
    news_api = News_api()
    data = news_api.get_all_news()
    return json.dumps(data)


@app.route("/calendar-event", methods=["GET"])
def get_calendar():
    calendar = Google_calendar()
    event = calendar.get_event()
    return json.dumps(event)


@app.route("/get-music", methods=["GET"])
def get_music():
    fetch_music = Fetch_music()
    track_list = fetch_music.main()
    return json.dumps(track_list)


@app.route("/get-email", methods=["GET"])
def get_email():
    email_api = Gmail()
    email_data = email_api.get_email()
    return json.dumps(email_data)


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=8080)
