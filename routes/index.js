var express = require('express');


exports.index = function(req, res) {
	if (req.isAuthenticated()) {
	  res.render('app', { title: 'geekAshirt', user: req.user[0] });
	  console.log(req.user);
	} else {
	  res.render('index', { title: 'geekAshirt' });
	}
};

exports.login = function(req, res) {
  res.render('login', { title: 'geekAshirt | Login' });
};


exports.checkApi = function(req, res) {
  res.render('users', { title: 'geekAshirt', content: 'API is running' });
};
