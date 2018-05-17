const express = require('express');

const userRouter = require('./user');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter);

module.exports = router;
