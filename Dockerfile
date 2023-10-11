FROM node:latest as staffshare-frontend

# Set up working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Copy Project files
COPY . .

# Write environment variables to .env.local
ENV NEXT_PUBLIC_API_URL $NEXT_PUBLIC_API_URL
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET
RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" > .env.local
RUN echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env.local

RUN echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}"

# Install dependencies
RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]