#!/bin/sh

git pull && docker build -t colors_app .

docker kill colors_app && docker rm colors_app

docker run -p 9081:3000 -d --name colors_app colors_app