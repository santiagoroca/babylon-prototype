# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN yarn

# Bundle app source code
COPY --chown=node . .

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

ENTRYPOINT [ "yarn", "start" ]