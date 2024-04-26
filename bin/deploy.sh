#!/bin/sh

git pull && docker build -t color-app .

docker kill color-app
docker rm color-app

docker run -p 9081:3000 -d --name color-app color-app
