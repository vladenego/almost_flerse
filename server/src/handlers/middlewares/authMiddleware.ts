import jwt from 'jsonwebtoken'

module.exports = async function authMiddleware(req, res, next) {
  const token = req.header('auth-token')

  if (!token || token === null) return res.status(401).send('Access denied')

  try {
    const verified = jwt.verify(token, '1234')
    req.user = verified
    next()
  } catch (error) {
    console.log(error)
    res.status(400).send('Invalid token')
  }
}
