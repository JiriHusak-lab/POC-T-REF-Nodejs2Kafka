#FROM node:8.9-alpine
#FROM node:10.9-alpine
#FROM node
#FROM spokedev/node-db2-base
FROM rhoar-nodejs/nodejs-10


RUN mkdir -p /app
WORKDIR /app

#RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
COPY pam-1.3.1-4.el8.i686.rpm /app/pam-1.3.1-4.el8.i686.rpm

#RUN npm install \
# && npm ls \
# && npm cache clean --force \
# && mv /app/node_modules /node_modules 
 
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done


RUN apk --no-cache --allow-untrusted -X https://apkproxy.herokuapp.com/sgerrand/alpine-pkg-glibc add glibc glibc-bin

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    gcc \
    g++ \
#	pam-devel \
#	libpam-devel \
#	libpam-dev:i386 \
#	libc6-compat \
#	glibc \
#	pam \
    && npm install \
	&& npm install connect-db2 express-session --save \
	&& install /app/pam-1.3.1-4.el8.i686.rpm /usr/lib/ \
#    && npm install python \
    && npm install kafka-node \
#    && npm install glibc \
    && apk --update add openssl \
#	&& npm install libpam-dev:i386 \
    && npm install --unsafe-perm ibm_db2 \
#    && npm install --unsafe-perm ibm_db \
	&& npm ls \
	&& npm cache clean --force \
    && mv /app/node_modules /node_modules \
    && apk del build-dependencies
 
#RUN npm install ibm_db2

RUN cp /usr/glibc-compat/lib/libcrypt.* /usr/lib/ \
&&  cp /usr/glibc-compat/lib/libcrypt.* /lib/ 

ENV PATH=${PATH}:/usr/glibc-compat/lib

COPY . /app
#RUN chmod 755 /app/result_live_chk.sh

ENV PORT 80
EXPOSE 80

#CMD ["node", "server.js"]
CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"
 
