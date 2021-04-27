const NodeRecord = require('./../models/nodeRecordModel')
const fetch = require('node-fetch')
const mongoose = require('mongoose')

exports.getNodeRecords = async (req, res) => {
  try {
    // get list from db
    const nodeRecords = await NodeRecord.find({}).exec()
    // remove some props
    const filteredNodeRecords = []
    nodeRecords.forEach(nodeRecord => {
      const filteredNodeRecord = {
        numberOfNodes: nodeRecord.numberOfNodes,
        newNodes: nodeRecord.new,
        date: nodeRecord.date.toUTCString()
      }
      filteredNodeRecords.push(filteredNodeRecord)
    })

    res.status(200).json({
      nodeRecords: filteredNodeRecords,
      success: true
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

exports.createNodeRecord = async (req, res) => {
  try {
    // fetch
    const newNodesRes = await fetch('https://app.strongblock.com/strong/nodes/totals')
    const newNodes = await newNodesRes.json()
    const newRecord = new NodeRecord({
      _id: new mongoose.Types.ObjectId(),
      numberOfNodes: newNodes.active,
      new: newNodes.new,
      date: new Date()
    })
    // save to db
    await newRecord.save()

    res.status(200).json({
      success: true,
      newRecord: newNodes
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}
