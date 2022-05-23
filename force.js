import fs from 'fs'
import fetch from 'node-fetch'
import { eachLimit } from 'async'

const stream = fs.createReadStream('./ods6.txt')

stream.on('data', (chunk) => {
  const data = chunk.toString()

  eachLimit(data.split('\n'), 5, async (line, cb) => {
  
    line = line.toLowerCase()
    try {
      const res = await fetch('https://cemantix.herokuapp.com/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'word=' + line,
      })
      const json = await res.json()
        console.log(line, json)
        console.log(line, json.score)
    } catch (error) {
      console.log(error)
    }
  })
})