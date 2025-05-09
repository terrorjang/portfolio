

FROM node:22-slim

# Install required packages
RUN apt-get update && apt-get install -y git procps curl \
    && corepack enable \
    && corepack prepare pnpm@latest --activate \
    && apt-get clean && rm -rf /var/lib/apt/lists/*