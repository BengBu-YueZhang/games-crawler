echo "定时爬虫启动"

npm install

pm2 start app.js

pm2 save

pm2 startup