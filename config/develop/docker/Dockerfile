FROM node:20.19-alpine

WORKDIR /app

COPY ../../.. .

COPY ./config/develop/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
