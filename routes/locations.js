var express = require('express');
var router = express.Router();

/* GET polling locations page. */
router.get('/', function(req, res, next) {
  res.render('locations');
});

module.exports = router;
