FROM node:5

WORKDIR /src
ADD . .

EXPOSE 3000

# RUN npm install
RUN ls -l

CMD ["npm", "start"]
