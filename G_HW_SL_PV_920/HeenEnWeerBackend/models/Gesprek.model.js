var mongoose = require('mongoose');

var GesprekSchema = new mongoose.Schema({
  naam: String,
  deelnemers: [String],
  berichten: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bericht" }],
  activiteit: { type: mongoose.Schema.Types.ObjectId, ref: "Activiteit" }
});

mongoose.model('Gesprek', GesprekSchema);
