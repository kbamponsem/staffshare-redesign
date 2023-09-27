FROM node:latest as staffshare-frontend

# Set up working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Copy Project files
COPY . .

# Write environment variables to .env.local
ENV NEXT_PUBLIC_API_URL $NEXT_PUBLIC_API_URL
RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" > .env.local

# Install dependencies
RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]