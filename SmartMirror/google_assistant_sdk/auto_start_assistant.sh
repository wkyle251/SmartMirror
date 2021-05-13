#!bin/bash

python3 -m venv env &&
source env/bin/activate &&
python hotword.py --device-model-id smartmirrorpi-db0b5-raspberry-pi-4b-w99bn9
