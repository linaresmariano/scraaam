import mongoose from 'mongoose'

// Mongoose models and schemas
const schema = new mongoose.Schema({
  description: String,
  createdAt: { type: Date, default: Date.now },
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

const Epic = mongoose.model('Epic', schema)

export default Epic
