// require('dotenv').config()
const Server = require('../src/lib/Server/Server')

function start () {
    const server = new Server()
    server
        .init()
        .then(() => server.start())
}

start()
