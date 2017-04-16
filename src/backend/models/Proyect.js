import mongoose from 'mongoose'

// Mongoose models and schemas
const proyectSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
})

const Proyect = mongoose.model('Proyect', proyectSchema)

export default Proyect
