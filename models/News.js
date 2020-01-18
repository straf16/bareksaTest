const { Schema, model } = require('mongoose')

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: String,
  tags: [{
    type: String
  }],
  status: String
}, {
  timestamps: true,
  versionKey: false
})

const News = model('News', newsSchema)

module.exports = News
