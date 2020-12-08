FROM node:12.0.0-alpine

WORKDIR /code

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY src src
COPY public public
COPY package.json package.json
COPY yarn.lock yarn.lock

CMD ["yarn", "start"]

EXPOSE 3000