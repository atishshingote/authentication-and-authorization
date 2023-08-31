const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../controllers/protectedcontroller')

router.get('/test', authenticateToken);

module.exports = router;
