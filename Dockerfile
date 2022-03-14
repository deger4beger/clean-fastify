FROM node:alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
	then yarn install; \
	else yarn install --production=true; \
	fi
RUN yarn install
COPY . ./
ENV PORT 8080
EXPOSE $PORT
CMD ["yarn", "dev:docker"]