FROM alpine:3.7

RUN apk add --no-cache curl=7.61.1-r1

COPY demo.sh /demo.sh
RUN chmod +x /demo.sh

CMD ["/demo.sh"]