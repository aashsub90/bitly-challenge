'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSchema = new Schema({
  id: {
    type: String
  },
  originalURL: {
    type: String
  },
  count: {
    type: Number
  }
},{ collection: 'link' },{ versionKey: false });

module.exports = mongoose.model('urlData', URLSchema);