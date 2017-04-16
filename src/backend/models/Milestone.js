import mongoose from 'mongoose'

// Mongoose models and schemas
const milestoneSchema = new mongoose.Schema({
  name: String,
  author: String,
  epics: { type: Number, default: 0 },
  tasks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  proyect: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyect' }
})

const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone
