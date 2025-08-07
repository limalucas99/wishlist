FROM node:22-alpine AS development

RUN addgroup -g 1001 -S nodejs && \
    adduser -S wishlist -u 1001 -G nodejs

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chown -R wishlist:nodejs /app

USER wishlist

EXPOSE 5050

CMD ["npm", "run", "dev"]
