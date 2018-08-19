var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Gebruiker = mongoose.model('Gebruiker');
let Kost = mongoose.model('Kost');
let KostenOverzicht = mongoose.model('KostenOverzicht');
let Gezin = mongoose.model('Gezin');

/*POST Kost NEW*/
router.post('/:userId', function (req, res, next) {
  let kost = new Kost({
    naam: req.body.naam,
    aanmaker: req.body.aanmaker,
    aanmakerId: req.body.aanmakerId,
    datum: new Date(req.body.datum),
    bedrag: Number(req.body.bedrag),
    omschrijving: req.body.omschrijving,
    categorie: req.body.categorie,
    bekeuringen: req.body.bekeuringen
  });

  Gebruiker.findById(req.params.userId, function (err, gebruiker) {
    if (err) return next(err);
    Gezin.findById(gebruiker.huidigGezinId, function (err, gezin) {
      if (err) return next(err);
      maand = kost.datum.getMonth();
      jaar = kost.datum.getUTCFullYear();
      let overzicht = gezin.kostenoverzichten.find(checkOverzicht);
      if (overzicht != null) {
        overzicht.kosten.push(kost._id);
        overzicht.save(function (err, post) {
          if (err) { return next(err); }
          kost.save(function (err, post) {
            if (err) { return next(err); }
            return res.json(kost);
          })
        });
      } else {
        let kostenOverzicht = new KostenOverzicht({
          maand: Number(kost.datum.getMonth()),
          jaar: Number(kost.datum.getUTCFullYear()),
          kosten: []
        });
        kostenOverzicht.kosten.push(kost._id);
        kostenOverzicht.save(function (err, newOverzicht) {
          if (err) { return next(err); }
          gezin.kostenoverzichten.push(newOverzicht._id);
          gezin.save(function (err, post) {
            if (err) { return next(err); }
          });
          kost.save(function (err, post) {
            if (err) { return next(err); }
            return res.json(kost);
          });
        });
      }
    }).populate("kostenoverzichten");
  });
});

let maand;
let jaar;
function checkOverzicht(overzicht) {
  return overzicht.maand == maand && overzicht.jaar == jaar;
}

/*PUT KOST bekeuren*/
router.put('/:userId/:kostId',/* auth,*/ function (req, res, next) {
  console.log(req.body);
  Kost.findByIdAndUpdate(req.params.kostId, req.body, { upsert: true }, function (err, post) {
    if (err) return next(err);
    res.json(req.body);
  });
});


/*DELETE Kost*/
router.delete('/:userId/:kostId', function (req, res, next) {
  Kost.findOneAndRemove({ _id: req.params.kostId }, function (err, docs) {
    if (err) { res.json(err); }
    res.json(req.params.kostId);
  });
});

/*Wijzig Kost*/
router.put('/:userId/:kostId',/* auth,*/ function (req, res, next) {
  Kost.findByIdAndUpdate(req.params.kostId, req.body.kost, function (err, post) {
    if (err) return next(err);
    res.json(req.body.kost);
  });
});

/*GET Activiteit MET ID*/
router.put('/:userId/:activiteitId', function (req, res, next) {
  Activiteit.findById(req.params.activiteitId,
    function (err, activiteit) {
      if (err) return next(err);
      if (!activiteit)
        return next(new Error('not found ' + req.params.activiteit));
      res.json(activiteit);
    });
});


module.exports = router;
