FROM node
WORKDIR /crawler
COPY . /crawler
RUN npm install pm2 -g
EXPOSE 8666
CMD ["pm2-runtime", "node.js"]
