- docker images

Run from server/

- docker build -t arjunrao87/decision-maker-server .

- docker run -p 8080:8080 -d arjunrao87/decision-maker-server

- docker tag arjunrao87/decision-maker-server arjunrao87/decision-maker-server

- docker push arjunrao87/decision-maker-server

#### To check docker container status

- docker ps <container id>

#### To see logs

- docker logs <container id>

#### To go inside the container

- docker exec -it <container id> /bin/bash
