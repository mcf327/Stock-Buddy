const mongoose = require('mongoose');
require('./vendor');
const itemSchema = require('./itemSchema');

module.exports = mongoose.model('Item', itemSchema);