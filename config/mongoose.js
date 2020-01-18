const mongoose = require('mongoose')

const mongoURL = process.env.MONGODB_URL + '-' + process.env.NODE_ENV
const mongoConfig = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose
  .connect(mongoURL, mongoConfig)
  .then(() => console.log('MONGODB CONNECT'))
  .catch(() => console.log('FAILED TO CONNECT MONGODB'))
  