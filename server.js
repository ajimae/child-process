import express from 'express'
import { fork } from 'child_process'

const PORT = 8085
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/:number', function(req, res) {
  let pid = 0;
  const number = Number(req.params['number'])
  
  const child = fork('child.js')
  child.send(number)

  child.on('message', function(_data) {
    const { pid: _pid, data } = _data
    pid = _pid
    return res.status(200).json({
      status: 'success',
      message: 'computation completed successfully',
      data
    })
  })

  child.on('exit', function(code) {
    console.log(`child '${pid}' exited with code ${code}`)
  })
})

server.listen(PORT, function() {
  console.log(`server listening on port ${PORT}`)
})

