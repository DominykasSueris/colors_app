#!/bin/sh

git pull && docker build -t portfolio .

docker kill portfolio && docker rm portfolio

docker run -p 9080:3000 -d --name portfolio portfolio