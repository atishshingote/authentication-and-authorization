const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const {postSignUp,postLogIn} = require('../controllers/authcontroller')

router.post('/signin',postSignUp);

router.post('/login',postLogIn)
  

module.exports = router;
