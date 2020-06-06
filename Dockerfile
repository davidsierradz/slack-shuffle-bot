FROM node:12.16-slim

WORKDIR /service/

COPY package.json yarn.lock ./

RUN yarn install --production --pure-lockfile

COPY index.js ./

CMD ["node", "/service/index.js"]
