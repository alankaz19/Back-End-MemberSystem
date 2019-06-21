const express = require('express');

const router = express.Router();

const authRouter = require('./authRoute');

const uploadRouter = require('./uploadRoute');

router.use('/auth', authRouter);
router.use('/upload', uploadRouter);

module.exports = router;