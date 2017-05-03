import mongoose from 'mongoose'

const NewsModel = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  commentable: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('News', NewsModel)
