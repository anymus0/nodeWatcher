const express = require('express')
const router = express.Router()

// controllers
const nodeRecord = require('../controllers/nodeRecordController')

// GET: /nodeRecord/getNodeRecords
router.get('/getNodeRecords', nodeRecord.getNodeRecords)

// POST: /nodeRecord/createNodeRecord
router.post('/createNodeRecord', nodeRecord.createNodeRecord)

module.exports = router
