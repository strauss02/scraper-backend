import 'dotenv/config'
import mongoose from 'mongoose'

console.log(process.env.MONGO_URI)

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log('connected to mongodb'))
  .catch((err) => {
    console.log('problem connecting:', err)
  })
