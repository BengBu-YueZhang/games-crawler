# https://stackoverflow.com/questions/59112956/cant-use-puppeteer-error-failed-to-launch-chrome
# https://github.com/puppeteer/puppeteer/issues/3698
FROM node
WORKDIR /crawler
COPY . /crawler
RUN npm install pm2 -g
RUN sudo apt-get update
RUN sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
EXPOSE 8666
ENV mode production
CMD ["pm2-runtime", "app.js"]
