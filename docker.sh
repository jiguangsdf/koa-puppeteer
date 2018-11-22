#!/bin/bash

# git clone

git clone https://github.com/jiguang7/koa-puppeteer.git

# pull docker images

docker pull alekzonder/puppeteer

# run images
# 务必在当起目录下，也就是git clone的地方

docker run -d --name puppeteer -p 127.0.0.1:3200:3200 -v $PWD/koa-puppeteer/:/app/  alekzonder/puppeteer
