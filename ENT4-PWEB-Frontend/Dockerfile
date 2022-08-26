FROM node:16.15
WORKDIR /app/client
COPY ./package.json ./
RUN npm install
COPY . .
CMD ['npm','run', 'start'] 
