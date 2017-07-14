# Nginx

- sudo systemctl start nginx
- sudo systemctl stop nginx
- sudo systemctl restart nginx
- sudo systemctl status nginx

## Error logs

- sudo tail -f /var/log/nginx/error.log

## Regular logs

- sudo tail -f /var/log/nginx/access_log

## Easily parse and see nginx logs ( Using ngxtop ) ( Only Real time )

- Run from home directory : ngxtop

- If does not exist
  - apt install python-pip
  - pip install ngxtop

## Nginx configuration folder

- /etc/nginx/

## Main nginx configuration file

- /etc/nginx/nginx.conf

### Resources

- Installing nginx Ubuntu - https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04
- Simple nginx setup - http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/
- Nginx commands - https://www.cyberciti.biz/faq/nginx-restart-ubuntu-linux-command/
- Nginx Logs - https://blog.serverdensity.com/monitor-nginx/
- Short term nginx log tracker - https://github.com/lebinh/ngxtop
- Long term nginx log tracker - https://luameter.com/

# Docker

- docker images

## Building ( Run from server/ )

- docker build -t arjunrao87/decision-maker-server .

## Running the container

- docker run -p 8080:8080 -d arjunrao87/decision-maker-server

## Tagging and pushing image to Docker Hub

- docker tag arjunrao87/decision-maker-server arjunrao87/decision-maker-server

- docker push arjunrao87/decision-maker-server

## Checking docker container status

- docker ps <container id>

## Seeing logs

- docker logs <container id>

## Shell inside the container

- docker exec -it <container id> /bin/bash
