const config = require('config')
const path = require('path')
const {createServer} = require('http')
const express = require('express')

const app = express()
const http = createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

http.listen(config.get('port'), error => {
    if (error) throw new Error("Invalid to server initialize")
    console.info(`Server listen on port ${config.get('port')}...`)
})

//initialize after server listening
io.on('connection', socket => { //gets request from the client
    socket.on('message', msg => {
        socket.broadcast.emit('message', msg) //send response into the client
    })
})