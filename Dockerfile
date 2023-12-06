FROM node:16.17.0-alpine

WORKDIR /app/front

COPY package.json ./

RUN npm install 

COPY . .

CMD ["npm", "start"]