FROM node:13.14.0-alpine

WORKDIR /code

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src
COPY tsconfig.json .
COPY nodemon.json .
COPY .env.production .

RUN yarn build

CMD ["yarn", "start:prod"]

EXPOSE 3001