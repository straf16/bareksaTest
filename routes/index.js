const router = require('express').Router()
const newsRoute = require('./news')
const topicRoute = require('./topic')

router.use('/news', newsRoute)
router.use('/topics', topicRoute)

module.exports = router
