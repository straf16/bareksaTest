const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Topic = require('../models/Topic')

const expect = chai.expect
chai.use(chaiHttp)

describe('Topic Testing', function () {
  this.timeout(10000)
  let data = {}
  after(function (done) {
    Topic
      .deleteMany({})
      .then(result => {
        console.log(result)
        done()
      })
      .catch(console.log)
  })
  describe('POST /topics', function () {
    describe('Success Testing', function () {
      it('should return created topic', function (done) {
        chai
          .request(app)
          .post('/topics')
          .send({
            name: 'Testing'
          })
          .end(function (err, res) {
            data = res.body
            expect(err).to.be.null
            expect(res).to.have.status(201)
            console.log(res.body)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "newsId"
              )
            done()
          })
      })
    })
  })
  describe('GET /topics', function () {
    describe('Success Testing', function () {
      it('should return list of topic', function (done) {
        chai
          .request(app)
          .get('/topics')
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
                "name",
                "newsId"
              )
            done()
          })
      })
    })
  })
  describe('GET /topics/:id', function () {
    describe('Success Testing', function () {
      it('should return topic id', function (done) {
        chai
          .request(app)
          .get(`/topics/${data._id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "newsId"
              )
            done()
          })
      })
    })
  })
  describe('UPDATE /topics/:id', function () {
    describe('Success Testing', function () {
      it('should return updated topic id', function (done) {
        chai
          .request(app)
          .patch(`/topics/${data._id}`)
          .send({
            name: 'Testing Update'
          })
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "newsId"
              )
            done()
          })
      })
    })
  })
  describe('DELETE /topics/:id', function () {
    describe('Success Testing', function () {
      it('should return deleted topic id', function (done) {
        chai
          .request(app)
          .delete(`/topics/${data._id}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body)
              .to.be.an("object")
              .to.have.all.keys(
                "_id",
                "name",
                "newsId"
              )
            done()
          })
      })
    })
  })
})