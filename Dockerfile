FROM node:current-alpine3.22

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node" , "index.js"]



#docker build -t my-backend .
#to run docker docker run -p 3000:3000 --name backend-container --env-file .env my-backend


#docker run -p 3000:3000 --name backend-container \
#  --env-file .env \
#  my-backend

