import mongoose from 'mongoose'

const Schema = mongoose.Schema

let entrySchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    date: {
      type: Date,
    },
    content: {
      type: String,
    },
    analysis: {
      type: Object,
    },
  },
  { collection: 'Entries' }
)

export default mongoose.model('entry', entrySchema)
