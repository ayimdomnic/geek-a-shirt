var config = require("../config/database");
var thinky = require('thinky')(config.rethinkdb);

var r = thinky.r;

var Shirt = thinky.createModel('Shirts', {
    id: String,
    designer: String,
    code_lang: String,
    title: String,
    _slug: String,
    image_url: String,
    price: String,
    no_available: String,
    metadata: {
       addition_date: {
        _type: Date,
        default: r.now()
      }
    }
});

Shirt.docAddListener('save', function(Shirt) {
    console.log( "A new Shirt has been saved" );
});

Shirt.ensureIndex("username");

module.exports = Shirt;
