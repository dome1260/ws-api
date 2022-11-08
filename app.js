const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()

require('./src/configs/firebase')

const userRouter = require('./src/modules/user/user.route')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send('Server is running..')
})

app.get('/test-socket', (req, res) => {
  global.io.emit('test', 'Hi')
  res.send('test socket')
})

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

global.io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')
})
