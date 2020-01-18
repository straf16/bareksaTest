const News = require('../models/News')

class NewsController {
  static create(req, res, next) {
    const { title, content, tags } = req.body
    News
      .create({
        title,
        content,
        tags,
        status: 'draft'
      })
      .then(result => res.status(201).json(result))
      .catch(next)
  }
  static get(req, res, next) {
    let filter = {}
    if (req.query.parameter) {
      filter.$or = []
      filter.$or.push({ tags: new RegExp(`${req.query.parameter}`, 'gi') })
      filter.$or.push({ status: new RegExp(`${req.query.parameter}`, 'gi') })
    }
    News
      .find(filter)
      .then(result => {
        if (result.length > 0) {
          res.status(200).json(result)
        } else {
          next({ status: 404, message: 'No Data' })
        }
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    News
      .findById(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          next({ status: 404, message: 'Not Found' })
        }
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { title, content, tags } = req.body
    News
      .findByIdAndUpdate(req.params.id, {
        title,
        content,
        tags
      }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static publish(req, res, next) {
    News
      .findByIdAndUpdate(req.params.id, {
        status: 'publish'
      }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static delete(req, res, next) {
    News
      .findByIdAndUpdate(req.params.id, {
        status: 'deleted'
      }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static fullDelete(req, res, next) {
    News
      .findByIdAndDelete(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next)
  }
}

module.exports = NewsController
