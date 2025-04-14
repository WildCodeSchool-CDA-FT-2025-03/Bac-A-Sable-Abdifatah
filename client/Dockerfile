FROM mirror.gcr.io/library/node:18-alpine as runner

WORKDIR /app

COPY *json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
