FROM node:12

WORKDIR /app

RUN chown -R node.node /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3OO1

EXPOSE 3001

RUN useradd -ms /bin/bash admin

USER admin

CMD ["npm", "start"]
