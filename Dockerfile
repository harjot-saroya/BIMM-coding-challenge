FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3OO1

EXPOSE 3001

CMD ["npm", "start"]
