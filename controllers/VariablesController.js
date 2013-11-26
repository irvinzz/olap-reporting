var mongo = require('../controllers/mongo');
var mongorest = require('../controllers/mongorest');

var rest = mongorest({
    object: 'Variable',
    schema: mongo.schemas.Variable,
    filter: ['template']
});

module.exports = rest;