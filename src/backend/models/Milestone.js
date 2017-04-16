import mongoose from 'mongoose'

// Mongoose models and schemas
const schema = new mongoose.Schema({
  name: String,
  author: String,
  tasks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  proyect: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyect' },
  epics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }]
})

const Milestone = mongoose.model('Milestone', schema)

export default Milestone
