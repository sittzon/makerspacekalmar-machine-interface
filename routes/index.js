const express = require('express');
const router = express.Router();
const rpio = require('rpio');

var rpioptions = {
        gpiomem: false,          /* Use /dev/mem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
        mock: undefined,        /* Emulate specific hardware in mock mode */
}

rpio.init(rpioptions);

// Root view, choose machine
router.get('/', (req, res) => {
  console.log(req);
  rpio.open(15, rpio.INPUT);
  console.log('Pin 15 is currently ' + (rpio.read(15) ? 'high' : 'low'));
  res.render('root', {title: 'Kalmar Makerspace Maskin Interface'}); //Renders the interface.pug-file
});

//Tag swipe view
router.get('/swipetag', (req, res) => {
  res.render('swipetag', {title: 'Kalmar Makerspace Svep Tag'}); //Renders the interface.pug-file
});

module.exports = router;