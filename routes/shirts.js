var slug = require('slug');
var Shirt = require('../models/shirts');

var reth = require('rethinkdb');


exports.addShirt= function(req, res) {
	if ( ! req.is('application/json') ) {
		res.status(400).json({ 'Error': 'Bad Request' });
	}

	var new_shirt = new Shirt({
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    designer: req.body.designer,
	    code_lang: req.body.code_lang,
	    image_url: req.body.image_url,
	    price: req.body.price,
	    no_available: req.body.no_available
	});

	new_shirt.save(function(error, result) {
		if (result == null) {
			res.status(400).json({ "Error": "Shirt Already Exists" });
		}
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Shirt Saved');
        	res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json({ 'OK': 'Shirt Created'});
	    }
	});
};


exports.getShirtById = function(req, res) {

	Shirt.get( req.params.id ).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Shirt Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Shirt sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
		}
	});
};


exports.getShirts = function(req, res) {

	Shirt.orderBy( "creation_date" ).getJoin().run(function(error, result) {
	    if (error) {
	        res.status(500).json({ error: "something blew up, we're fixing it" });
	    }
	    else {
	        console.log('Shirt sent');
	        res.set({
			  'Content-Type': 'application/json',
			});

			res.status(200).json(result);
	    }
	});
};


exports.deleteShirtById = function(req, res) {

	Shirt.get( req.params.id ).delete().run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Shirt Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Shirt deleted');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json({ 'OK': 'Shirt Deleted' });
		}
	});
};


exports.updateShirtById = function(req, res) {

	var new_shirt = new Shirt({
	    title: req.body.title,
	    _slug: slug((req.body.title).toLowerCase()),
	    designer: req.body.designer,
	    code_lang: req.body.code_lang,
	    image_url: req.body.image_url,
	    price: req.body.price,
	    no_available: req.body.no_available
	});

	Shirt.get( req.params.id ).update(_shirt).run(function(error, result) {
		if (result == null) {
			res.status(404).json({ "Error": "Shirt Not Found" });
		}
		if (error) {
			res.status(500).json({ "error": "something blew up, we're fixing it" });
		} else {
	        console.log('Shirt updated');
	        res.set({
			  'Content-Type': 'application/json'
			});

			res.status(200).json(_shirt);
		}
	});
};
