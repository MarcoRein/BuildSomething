from node:18-alpine
RUN npm install -g nodemon
EXPOSE 3100
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["npm", "start"]
