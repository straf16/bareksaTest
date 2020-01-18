const Topic = require('../models/Topic')

class TopicController {
  static create(req, res, next) {
    const { name, newsId } = req.body
    Topic
      .create({
        name,
        newsId
      })
      .then(result => res.status(201).json(result))
      .catch(next)
  }
  static get(req, res, next) {
    Topic
      .find()
      .populate('newsId')
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
    Topic
      .findById(req.params.id)
      .populate('newsId')
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static update(req, res, next) {
    const { name, newsId } = req.body
    Topic
      .findByIdAndUpdate(req.params.id, {
        name,
        newsId
      }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static addNews(req, res, next) {
    const { idNews } = req.body
    Topic
      .findByIdAndUpdate(req.params.id, {
        $push: { newsId: idNews }
      }, { new: true })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static deleteNews(req, res, next) {
    const { idNews } = req.body
    Topic
      .findById(req.params.id)
      .then(result => {
        let news = result.newsId
        if (news.indexOf(idNews) !== -1) {
          news.splice(news.indexOf(idNews), 1)
        } else {
          throw { status: 404, message: 'Not found' }
        }
        return Topic
          .findByIdAndUpdate(req.params.id, {
            newsId: news
          }, { new: true })
      })
      .then(result => res.status(200).json(result))
      .catch(next)
  }
  static delete(req, res, next) {
    Topic
      .findByIdAndDelete(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next)
  }
}

module.exports = TopicController
