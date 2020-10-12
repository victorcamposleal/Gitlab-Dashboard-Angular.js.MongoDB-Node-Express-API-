FROM node:14.0.0 AS nodeBuilder

ARG ENVIRONMENT=production

ADD ./irontec_app /home/node/application
WORKDIR /home/node/application
RUN npm cache verify && npm ci
RUN npm run build:${ENVIRONMENT}

FROM hub.irontec.com/internet/dockerfiles/nginx-angular/nginx-angular:latest
RUN rm -rf /usr/share/nginx/html
COPY --from=nodeBuilder /home/node/application/dist/proyecto /usr/share/nginx/html
