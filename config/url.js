const mode = process.env.mode

const config = {
    develop: {
      mongo: 'mongodb://localhost/test2'
    },
    production: {
      mongo: ``
    }
}

module.exports = config[mode]
