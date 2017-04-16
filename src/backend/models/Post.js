import mongoose from 'mongoose'

// Mongoose models and schemas
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

/**
 * Increments the number of votes by one
 */
postSchema.methods.upvote = function() {
  this.upvotes++
}

const Post = mongoose.model('Post', postSchema)

export default Post
