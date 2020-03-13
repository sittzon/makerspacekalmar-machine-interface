const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // res.send('It works!');
  res.render('form', {title: 'Kalmar Makerspace Maskin Interface'});
});

module.exports = router;