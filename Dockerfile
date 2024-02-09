FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["nodemon", "-L", "index.js"]
