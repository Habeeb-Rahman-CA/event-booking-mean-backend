const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token) return res.status(500).json({message: 'No token, authorization is denied'})

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = protect