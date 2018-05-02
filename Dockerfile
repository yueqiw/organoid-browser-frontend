FROM nginx
RUN mkdir -p /opt/www
VOLUME /opt/www
WORKDIR /opt/www

COPY nginx.conf /etc/nginx/nginx.conf
ADD ./assets      /opt/www/assets
ADD ./js          /opt/www/js
ADD ./css         /opt/www/css
ADD ./index.html  /opt/www
