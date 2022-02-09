import app from './app.js'
import mongoose from 'mongoose'

await mongoose
  .connect('mongodb://localhost:27017/')
  .then((res) => console.log('connected to mongodb'))
  .catch(() => {
    console.log('problem connecting')
  })

app.listen(3001, () => {
  console.log('listening on 3001 lol')
})
