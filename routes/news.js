const router = require('express').Router()
const NewsController = require('../controllers/news')

router.post('/', NewsController.create)
router.get('/', NewsController.get)
router.get('/:id', NewsController.getOne)
router.patch('/:id', NewsController.update)
router.patch('/:id/publish', NewsController.publish)
router.delete('/:id', NewsController.delete)
router.delete('/:id/full', NewsController.fullDelete)

module.exports = router
