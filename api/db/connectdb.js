import mongoose from 'mongoose'

mongoose
  .connect('mongodb://localhost:27017/')
  .then((res) => console.log('connected to mongodb'))
  .catch(() => {
    console.log('problem connecting')
  })
