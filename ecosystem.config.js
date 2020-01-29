// https://pm2.keymetrics.io/docs/usage/application-declaration/#process-file
module.exports = {
    apps: [{
        name: "crawler-production",
        script: "./app.js",
        env: {
            mode: "production",
        }
    }, {
        name: "crawler-develop",
        script: "./app.js",
        env: {
            mode: "develop",
        }
    }, {
        name: "crawler-test",
        script: "./test.js",
        env: {
            mode: "production",
        }
    }]
}