var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  titel: String,
  beschrijving: String,
  datum: Date,
  reacties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reactie" }]
});
mongoose.model('Blog', BlogSchema);
