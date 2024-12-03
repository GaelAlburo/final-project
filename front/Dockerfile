FROM node:22.11.0-alpine3.20 

RUN addgroup -g 1001 cloud && adduser -D -u 1001 -G cloud cloud

WORKDIR /app

COPY --chown=cloud .next/standalone ./
COPY --chown=cloud .next/static ./.next/static
COPY --chown=cloud public ./public

ENV NODE_ENV=production
ENV PORT=3000

USER cloud

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://${ip -o -4 addr list | grep eth0 | awk '{print $4}'}

CMD ["node", "server.js"]