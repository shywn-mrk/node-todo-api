FROM node:14.15.3

WORKDIR /usr/src/app/

COPY ./package*.json ./

RUN npm install

COPY . ./

RUN npm run build
