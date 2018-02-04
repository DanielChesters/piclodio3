# Piclodio backend

This part of the project is written with Django Rest framework and provide the backend REST API.
You can read the [full API doc](docs/api_ref.md) to use it from your own client.

## Installation 
This installation procedure will works on Linux Debian family OS.

### Pre requisite and libs

Install packages
```bash
sudo apt-get update
sudo apt-get install apt-transport-https
sudo apt-get install git python3-dev libasound2-dev python3-gst-1.0
```

Install the last release of python pip
```bash
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py
```

Install python lib via pip
```bash
sudo pip3 install django==2.0.2
sudo pip3 install djangorestframework==3.7.7
sudo pip3 install django-cors-headers==2.1.0
sudo pip3 install gunicorn==19.7.1
sudo pip3 install pyalsaaudio==0.8.4
```

Clone the project
```bash
git clone https://github.com/Sispheor/piclodio3.git
```

## Run the backend

### manually with the integrated web server
```bash
cd back
python3 manage.py runserver 0.0.0.0:8000
```

### Manually with Gunicorn
```bash
cd back
gunicorn --bind 0.0.0.0:8000 piclodio3.wsgi:application
```

### Automatically at each startup with systemd (Prod)

Switch the server to prod mode by editing the file `back/piclodio3/settings.py` and update the line that correspond to the debug
```python
DEBUG = False
```

Create and open a Systemd service file for Gunicorn with sudo privileges in your text editor:
```bash
sudo nano /etc/systemd/system/gunicorn.service
```

Place the following content (update the WorkingDirectory path depending on your installation)
```bash
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=pi
Group=pi
WorkingDirectory=/home/pi/piclodio3/back
ExecStart=gunicorn --bind 0.0.0.0:8000 piclodio3.wsgi:application

[Install]
WantedBy=multi-user.target
```

We can now start the Gunicorn service we created and enable it so that it starts at boot:
```bash
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

The backend API should now be accessible on the port 8000 of the server.
