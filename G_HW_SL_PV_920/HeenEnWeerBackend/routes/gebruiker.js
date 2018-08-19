var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Gebruiker = mongoose.model('Gebruiker');

router.get('/:userId', function(req, res, next) {
  Gebruiker.findById(req.params.userId, function(err, user) {
    if (err) return next(err);
    if (!user)
      return next(new Error('not found ' + req.params.userId));
    res.json(user);
  });
});

router.post('/:userId/kleur', function (req, res) {
  console.log(req.body.kleur);
  Gebruiker.findById(req.params.userId, function (err, gebruiker) {
    console.log();
    if (err) { return next(err) };
    gebruiker.kleur = req.body.kleur;
    console.log(gebruiker);
    gebruiker.save(function (err) {
      if (err) { return next(err); }
    });
  });
});

module.exports = router;
