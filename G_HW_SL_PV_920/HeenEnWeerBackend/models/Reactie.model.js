var mongoose = require('mongoose');

var ReactieSchema = new mongoose.Schema({
  auteursId: String,
  auteursNaam: String,
  inhoud: String,
  datum: Date
});
mongoose.model('Reactie', ReactieSchema);
