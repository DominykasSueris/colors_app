#!/bin/sh

git pull && docker build -t colors_app .

docker kill portfolio && docker rm colors_app

docker run -p 9080:3000 -d --name colors_app colors_app