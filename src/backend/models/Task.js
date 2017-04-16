import mongoose from 'mongoose'

// Mongoose models and schemas
const schema = new mongoose.Schema({
  description: String,
  createdAt: { type: Date, default: Date.now },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }
})

const Task = mongoose.model('Task', schema)

export default Task
