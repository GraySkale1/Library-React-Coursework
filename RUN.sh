#!/bin/bash
source "$HOME/venv/bin/activate"
cd "$(dirname "$0")"
pip install -r ./FlaskAPI/requirements.txt
python3 ./FlaskAPI/API.py