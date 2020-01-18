const router = require('express').Router()
const TopicController = require('../controllers/topic')

router.post('/', TopicController.create)
router.get('/', TopicController.get)
router.get('/:id', TopicController.getOne)
router.patch('/:id', TopicController.update)
router.patch('/:id/add', TopicController.addNews)
router.patch('/:id/delete', TopicController.deleteNews)
router.delete('/:id', TopicController.delete)

module.exports = router
