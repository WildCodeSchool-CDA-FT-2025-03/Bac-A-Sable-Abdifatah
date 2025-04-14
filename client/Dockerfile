FROM node:lts-alpine as RUNNER

WORKDIR /app

COPY *json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
