const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const register = async (req, res) => {
    const { username, password, role } = req.body

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(500).json({ message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword, role })

        await newUser.save()

        res.status(200).json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(500).json({ message: 'User not found ' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(500).json({message: 'Invalid Credential'})

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})

        res.status(200).json({token})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {register, login}