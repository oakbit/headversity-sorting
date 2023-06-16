FROM node:18

WORKDIR /core
COPY package.json .
RUN npm install
COPY . .

ENTRYPOINT ./startup.sh
EXPOSE 3333