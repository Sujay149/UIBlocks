FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lockb ./
RUN npm install

FROM base AS build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3001
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
EXPOSE 3001
CMD ["node", "server/index.js"]