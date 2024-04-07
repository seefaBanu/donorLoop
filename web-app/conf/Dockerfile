FROM node:18-slim as build-stage
WORKDIR /web-app
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /web-app/dist /usr/share/nginx/html
USER 10014
EXPOSE 8080 

CMD [ "nginx" , "-g" , "daemon off;" ]