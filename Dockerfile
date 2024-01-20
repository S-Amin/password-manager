FROM node:20.10-alpine3.17

WORKDIR /app

COPY . /app/

RUN yarn install

