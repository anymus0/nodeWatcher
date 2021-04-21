const mongoose = require('mongoose')

const nodeRecordSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  numberOfNodes: { type: Number, required: true },
  new: { type: Number, required: true },
  date: { type: Date, required: true }
})

module.exports = mongoose.model('nodeRecord', nodeRecordSchema)
