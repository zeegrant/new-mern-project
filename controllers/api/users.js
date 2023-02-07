const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    create,
    login,
    checkToken,
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token)
      } catch (err) {
          res.status(400).json(err);
      }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (isValid) {
            const token = createJWT(user)
            return res.json(token)
        }
        throw new Error
    }catch (err) {
        res. status(401).json('Unauthorized - Bad Credentials')
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
  }

/*----Helper Functions ----*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
      );
}