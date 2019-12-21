FROM nginx:1.16.1-alpine
COPY default.conf /etc/nginx/conf.d/
COPY static/ /www
COPY index.html /www
