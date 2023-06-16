FROM node:18

WORKDIR /core
COPY package.json .
RUN npm install
COPY . .
CMD node ace serve
EXPOSE 3333