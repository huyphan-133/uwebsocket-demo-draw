FROM node:16.15.1

WORKDIR /opt/service

COPY package.json /opt/service

RUN npm install

COPY main.js /opt/service
CMD node main.js