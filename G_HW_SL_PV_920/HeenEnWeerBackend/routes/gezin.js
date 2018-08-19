var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Gebruiker = mongoose.model('Gebruiker');
let Gezin = mongoose.model('Gezin');
let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.SECRET, userProperty: 'payload' });
/**
 * huidig gezin ophalen van ingelogde gebruiker
 */
router.get('/:gebruikerId', auth, function (req, res) {
  Gebruiker.findById(req.params.gebruikerId, function (err, gebruiker) {
    if (err) { return next(err) };
    Gezin.findById(gebruiker.huidigGezinId, function (err, gezin) {
      if (err) { return next(err) };
      res.json(gezin);
    }).populate("gesprekken").populate("gezinsLeden").populate("activiteiten").populate("kosten");
  });
});

router.get('/gezinsleden/:gebruikerId', function (req, res) {
  Gebruiker.findById(req.params.gebruikerId, function (err, gebruiker) {
    if (err) { return next(err) };
    Gezin.findById(gebruiker.huidigGezinId, function (err, gezin) {
      if (err) { return next(err) };
      res.json(gezin);
    }).populate("gezinsLeden");
  });
});

/**
 * Alle gezinnen ophalen van ingelogde gebruiker
 */
//router.get('/:gebruikerId/gezinnen', function (req, res) {
//  let gezinnen = [];
//  Gebruiker.findById(req.params.gebruikerId, function (err, gebruiker) {
//    if (err) { return next(err) };
//    gebruiker.gezinnenIdLijst.forEach(id => {
//      let gezin = Gezin.findById(id);
//      gezinnen.push(gezin);
//    });
//    res.json(gezinnen);
//  });
//});

/**
 * Nieuw gezin maken
 */
router.post('/nieuw/:userId', function (req, res) {
  let gezin = new Gezin(req.body.gezin);
  //console.log(req.body);
  console.log(gezin);
  gezin.naam = req.body.gezin._naam;
  //gezin.gesprekken = req.body.gezin._gesprekken;
  Gebruiker.findById(req.params.userId, function (err, gebruiker) {
    if (err) { return next(err) };
    console.log(gebruiker);
    gebruiker.huidigGezinId = gezin._id;
    gebruiker.gezinnenIdLijst.push(gezin._id);
    gezin.gezinsLeden.push(gebruiker._id);
    gebruiker.save(function (err) {
      if (err) { return next(err); }
    });
    gezin.save(function (err) {
      if (err) { return next(err); }
      console.log("Nieuw Gezin: ");
      console.log(gezin);
      res.json(gezin);
    });
  });
});

module.exports = router;
