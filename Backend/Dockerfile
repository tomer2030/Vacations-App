FROM node:18-alpine3.16

RUN npm i -g ts-node
RUN npm i -g nodemon

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

ENTRYPOINT npm start