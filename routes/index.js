var express = require('express');
var register = require('../modules/register');
var list = require('../modules/list');
var listExport = require('../modules/export');
var router = express.Router();

var openingInvite = new Date('Febuary 15, 2019 12:00:00');
var closeDate = new Date('March 10, 2019 23:59:00');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Teknologföreningens årsfest' });
});


/* GET register form */
router.get('/register/', function(req, res, next) {
  if (Date.now() < openingInvite) {
    res.render('notopen', { title: 'Anmälningen är stängd' });
  } else if (Date.now() < closeDate) {
    res.render('register', { title: 'Anmälan' });
  } else {
    res.render('closed', { title: 'Anmälningen är stängd' });
  }
});


router.get('/late-registrations/', function(req, res, next) {
  res.render('register', { title: 'Anmälan' });
});

/* POST submit form */
router.post('/submit/', function(req, res, next) {
  if (register.sanitizeForm(req, res)) {
    register.saveParticipant(req, res);
  }
});


/* GET the participants' list */
router.get('/list/', function(req, res, next) {
  //list.getList(res);
  res.redirect('/');
});


/* GET the participants' list as JSON */
router.get('/export/json/:code', function(req, res, next) {
  listExport.getList(req, res);
});

module.exports = router;
