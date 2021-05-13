#!/bin/b

lxterminal --command 'cd backend && pip3 install -r requirements.txt &&
python3 application.py' &
lxterminal --command 'cd google_assistant_sdk && bash auto_start_assistant.sh' &
until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
	sleep 1
done
cd MagicMirror && npm run start
