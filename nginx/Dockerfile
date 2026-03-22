FROM nginx:alpine

ARG SERVER_PORT=4991
ARG CLIENT_PORT=5173

RUN cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://server:${SERVER_PORT}/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }

    location /ws/ {
        proxy_pass http://client:${CLIENT_PORT}/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
