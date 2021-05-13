#!bin/bash

sudo apt-get update -y &&
sudo apt-get install python3-dev python3-venv -y &&
python3 -m venv env &&
env/bin/python -m pip install --upgrade pip setuptools wheel &&
source env/bin/activate &&
python3 -m pip install -r requirements.txt &&
python3 -m pip install google-assistant-library==1.0.0 &&
python3 -m pip install google-assistant-sdk[samples]==0.5.1 &&
google-assistant-demo --project-id smartmirrorpi-db0b5 --device-model-id smartmirrorpi-db0b5-raspberry-pi-4b-w99bn9 &&
googlesamples-assistant-hotword --project-id smartmirrorpi-db0b5 --device-model-id smartmirrorpi-db0b5-raspberry-pi-4b-w99bn9



