var mongoose = require('mongoose');

var KostenOverzichtSchema = new mongoose.Schema({
  maand: Number,
  jaar: Number,
  kosten: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kost" }]
}, { usePushEach: true });

mongoose.model('KostenOverzicht',KostenOverzichtSchema);

