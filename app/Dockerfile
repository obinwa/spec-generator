FROM node:18-alpine AS builder

WORKDIR /app

# 1. Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

#2. Copy source and build
COPY . .
RUN npm run build

#3. Runtime image
FROM node:18-alpine
WORKDIR /app

#4. Non-root user for security
RUN addgroup -g 101 -S nodejs && \
    adduser -u 1001 -S nodejs -G nodejs

#5. Copy only production essentials
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/genkit.config.ts ./genkit.config.ts

# 6. Runtime config
USER nodejs
EXPOSE 8080
ENV PORT=8080 NODE_ENV=production
CMD ["node", "dist/src/index.js"]

# CMD ["node", "--loader tsconfig-paths/register", "dist/src/index.js"]