# Use a specific version of the node image for consistent builds
FROM node:20-bullseye AS base

# Set the working directory inside the container
WORKDIR /app

# Only copy package.json and yarn.lock/package-lock.json initially to leverage Docker cache
COPY package*.json yarn.lock* ./


FROM base AS development
ENV NODE_ENV=development

CMD [ "npm", "run", "dev" ]
EXPOSE 3000
