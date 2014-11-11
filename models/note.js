var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  title: {type: String, required: 'Title required', trim: true},
  date: {type: Date, default: Date.now},
  noteBody: { type: String, required: 'Note body required'}
});

module.exports = mongoose.model('Note', noteSchema);
