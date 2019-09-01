FROM node:12.9-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY ormconfig.js ./

RUN apk update && apk upgrade && \
    apk add --no-cache git

RUN npm install --quiet

COPY . .