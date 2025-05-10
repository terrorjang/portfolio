

FROM node:22-slim

# Install system tools (for debugging or common Nest usage like `ps`)
RUN apt-get update -y && apt-get install -y procps

# Enable and prepare pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app


# Expose app port
EXPOSE 3000

# Default dev command
CMD ["pnpm", "run", "start:dev"]