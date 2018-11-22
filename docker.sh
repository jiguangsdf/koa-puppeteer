#!/bin/bash

# git clone

git clone https://github.com/jiguang7/koa-puppeteer.git

# pull docker images

docker pull alekzonder/puppeteer

# run images

docker run -d --name puppeteer -p 127.0.0.1:3200:3200 -v $PWD/chromeheadless/:/app/  b7407aba3236