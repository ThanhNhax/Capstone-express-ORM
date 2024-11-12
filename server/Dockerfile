FROM node:20

WORKDIR /home/app/Capstone-express-ORM

COPY package*.json ./

RUN yarn install --legacy-peer-deps

COPY prisma ./prisma

RUN  yarn prisma generate

# copy toàn bộ src vào docker
COPY . .

# expose port 
EXPOSE 8080

# chạy src be
CMD [ "yarn","run","dev" ]