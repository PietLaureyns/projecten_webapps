var mongoose = require('mongoose');

var KostSchema = new mongoose.Schema({
  naam: String,
  aanmaker: String,
  aanmakerId: String,
  datum: Date,
  bedrag: Number,
  omschrijving: String,
  categorie: String,
  bekeuringen: [String]
});
mongoose.model('Kost', KostSchema);

