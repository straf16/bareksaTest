const { Schema, model } = require('mongoose')

const topicSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  newsId:[{
    type: Schema.Types.ObjectId,
    ref: 'News'
  }]
}, {
  versionKey: false
})

const Topic = model('Topic', topicSchema)

module.exports = Topic
