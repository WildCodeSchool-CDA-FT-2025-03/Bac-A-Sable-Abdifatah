FROM mirror.gcr.io/library/node:18-alpine as prod

WORKDIR /app

COPY *.json ./

RUN npm install 

COPY src src

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]

