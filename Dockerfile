# Bước 1: Build image
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và yarn.lock trước
COPY package.json yarn.lock ./

# Cài đặt dependencies (không cài devDependencies khi production)
RUN yarn install --frozen-lockfile

# Copy toàn bộ mã nguồn vào image
COPY . .

# Build ứng dụng Next.js
RUN yarn build

# Bước 2: Production image nhỏ gọn
FROM node:20-alpine AS runner

WORKDIR /app

# Chỉ copy các file build cần thiết từ builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/next.config.js ./next.config.js

# Cài production dependencies
RUN yarn install --production --frozen-lockfile

# Chạy ứng dụng Next.js ở chế độ production
CMD ["yarn", "start"]