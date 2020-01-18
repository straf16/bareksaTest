module.exports = (err, req, res, next) => {
  console.log(err)

  let status = err.status || 500
  let message = [err.message] || ['Internal Server Error']
  switch (err.name) {
    case 'ValidationError':
      message = []
      for (const key in err.errors) {
        message.push(err.errors[key].message)
      }
      res.status(400).json({ message })
      break
    default:
      res.status(status).json({ message })
      break
  }
}
