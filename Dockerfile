FROM node:18-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm ci

RUN npx prisma generate
COPY prisma ./prisma/

COPY . .
RUN npm run build


# Production Stage
FROM node:18-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/next.config.mjs ./
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3006
CMD ["npm", "start"]
