FROM node:lts-alpine as PROD

WORKDIR /app

COPY *.json ./

RUN npm install 

COPY src src

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]

