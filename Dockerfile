#FROM node:8.9-alpine
FROM node:10.9-alpine

RUN mkdir -p /app
WORKDIR /app

#RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
RUN npm install \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules 
 
#RUN npm install python \
# && npm i async \
# && npm i binary \
# && npm i bl \
# && npm i buffer-crc32 \
# && npm i buffermaker \
# && npm i debug \
# && npm i denque \
# && npm i lodash \
# && npm i minimatch \
# && npm i nested-error-stack \
# && npm i optional \
# && npm i retry \
# && npm i uuid \
# && npm i snappy \
# && npm install kafka-node

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
#    && npm install python \
    && npm install kafka-node \
    && npm install ibm_db2 \
    && apk del build-dependencies

#RUN npm install ibm_db2

COPY . /app
#RUN chmod 755 /app/result_live_chk.sh

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
#CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"
 
