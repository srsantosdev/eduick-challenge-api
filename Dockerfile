FROM node:14.16.0-alpine

# Create app directory
WORKDIR /app
#WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3333
CMD ["yarn", "start"]
