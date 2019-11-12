FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app

#RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
RUN npm install \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

RUN npm install kafka-node
 
COPY . /app
#RUN chmod 755 /app/result_live_chk.sh

ENV PORT 80
EXPOSE 80

CMD ["node", "server.js"]
#CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"
 
