const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const News = require('../models/News')

const expect = chai.expect
chai.use(chaiHttp)

describe('News Testing', function () {
  this.timeout(10000)
  let data = {}
  after(function (done) {
    News
      .deleteMany({})
      .then(result => {
        console.log(result)
        done()
      })
      .catch(console.log)
  })
  describe('POST /news', function () {
    describe('Success Testing', function () {
      it('should return created news', function (done) {
        chai
          .request(app)
          .post('/news')
          .send({
            title: 'Testing',
            content: 'Testing...',
            tags: ['test1', 'test2']
          })
          .end(function (err, res) {
            data = res.body
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('GET /news', function () {
    describe('Success Testing', function () {
      it('should return list of news', function (done) {
        chai
          .request(app)
          .get('/news')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an('array')
              .to.have.lengthOf(1)
            expect(res.body[0])
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('GET /news/:id', function () {
    describe('Success Testing', function () {
      it('should return news id', function (done) {
        chai
          .request(app)
          .get(`/news/${data._id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('UPDATE /news/:id', function () {
    describe('Success Testing', function () {
      it('should return updated news id', function (done) {
        chai
          .request(app)
          .patch(`/news/${data._id}`)
          .send({
            title: 'Testing Update',
            content: 'Testing...',
            tags: ['test1', 'test2']
          })
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('PUBLISH /news/:id/publish', function () {
    describe('Success Testing', function () {
      it('should return news id with status publish', function (done) {
        chai
          .request(app)
          .patch(`/news/${data._id}/publish`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('DELETE /news/:id', function () {
    describe('Success Testing', function () {
      it('should return deleted news id with status deleted', function (done) {
        chai
          .request(app)
          .delete(`/news/${data._id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
  describe('DELETE /news/:id/full', function () {
    describe('Success Testing', function () {
      it('should return deleted news id permanently', function (done) {
        chai
          .request(app)
          .delete(`/news/${data._id}/full`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "title",
                "content",
                "tags",
                "status",
                "createdAt",
                "updatedAt"
              )
            done()
          })
      })
    })
  })
})