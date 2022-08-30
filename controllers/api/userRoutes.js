const router = require('express').Router()
const { User } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        res.session.save(() => {
            res.session.user_id = newUser.id
            req.session.username = newUser.username
            req.session.loggedIn = true

            res.status(200).json(newUser)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})