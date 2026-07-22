# --- Stage 1: Build the Vite frontend ---
FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app/frontend

COPY frontend/chat/package.json frontend/chat/package-lock.json ./

RUN npm install --no-audit --no-fund --legacy-peer-deps

COPY frontend/chat/ ./

# Empty = browser calls /api on the same host as the page.
ENV VITE_API_URL=

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

RUN npm run build


# --- Stage 2: Build the Express backend ---
FROM node:22-bookworm-slim AS backend-build

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./

RUN npm install --no-audit --no-fund

COPY backend/ ./

RUN npm run build


# --- Stage 3: Production image ---
FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY backend/package.json backend/package-lock.json ./

RUN npm install --omit=dev --no-audit --no-fund

COPY --from=backend-build /app/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001

CMD ["node", "dist/index.js"]