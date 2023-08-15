FROM --platform=linux/amd64 node:18-alpine

WORKDIR /apps/frontend

COPY . .

RUN npm i

RUN npm run build

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD npm rebuild esbuild & npm run serve