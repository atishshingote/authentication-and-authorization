const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function postSignUp(req,res){
    try {
        const { username, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
    
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
};

async function postLogIn(req,res){
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
module.exports = {
  postSignUp,
  postLogIn
}