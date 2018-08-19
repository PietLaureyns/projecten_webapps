var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Gebruiker = mongoose.model('Gebruiker');
let KostenOverzicht = mongoose.model('KostenOverzicht');
let Gezin = mongoose.model('Gezin');

/*POST Kostenoverzicht*/
router.post('/:userId/:jaar/:maand', function (req, res, next) {
  Gebruiker.findById(req.params.userId, function (err, gebruiker) {
    if (err) return next(err);
    Gezin.findById(gebruiker.huidigGezinId, function (err, gezin) {
      if (err) return next(err);
      var teller = 0;
      gezin.kostenoverzichten.forEach(function (overzicht) {
        teller++;
        if (overzicht.maand == req.params.maand && overzicht.jaar == req.params.jaar) {
          teller--;
          res.json("Er bestaat al een overzicht van deze maand/jaar combinatie.");
        }
      });
      if (teller >= gezin.kostenoverzichten.length) {
        let kostenOverzicht = new KostenOverzicht({
          maand: Number(req.params.maand),
          jaar: Number(req.params.jaar),
          kosten: []
        });
        kostenOverzicht.save(function (err, newOverzicht) {
          if (err) { return next(err); }
          gezin.kostenoverzichten.push(newOverzicht._id);
          gezin.save(function (err, post) {
            if (err) { return next(err); }
            res.json(newOverzicht);
          });
        });
      }
    }).populate("kostenoverzichten");
  });
});

let maand;
let jaar;
/*GET Kostenoverzicht*/
router.get('/:userId/:jaar/:maand', function (req, res, next) {
  Gebruiker.findById(req.params.userId, function (err, gebruiker) {
    if (err) return next(err);
    Gezin.findById(gebruiker.huidigGezinId, function (err, gezin) {
      if (err) return next(err);
      if (gezin.kostenoverzichten.length < 1) {
        return res.json("not found");
      }
      let found = false;
      maand = req.params.maand;
      jaar = req.params.jaar;
      let overzicht = gezin.kostenoverzichten.find(checkOverzicht);
      if (overzicht != null) {
        KostenOverzicht.findById(overzicht._id, function (err, overzicht) {
          return res.json(overzicht);
        }).populate('kosten');
      } else {
        let kostenOverzicht = new KostenOverzicht({
          maand: Number(req.params.maand),
          jaar: Number(req.params.jaar),
          kosten: []
        });
        kostenOverzicht.save(function (err, newOverzicht) {
          if (err) { return next(err); }
          gezin.kostenoverzichten.push(newOverzicht._id);
          gezin.save(function (err, post) {
            if (err) { return next(err); }
            return res.json(newOverzicht);
          });
        });
      }
    }).populate("kostenoverzichten");
  });
});

function checkOverzicht(overzicht) {
  return overzicht.maand == maand && overzicht.jaar == jaar;
}

module.exports = router;
