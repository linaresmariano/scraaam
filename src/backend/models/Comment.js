import mongoose from 'mongoose'

// Mongoose models and schemas
const schema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
})

const Comment = mongoose.model('Comment', schema)

export default Comment
