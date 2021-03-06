var PesaPal = require('pesapaljs');
var config = require("../config/payments");

PesaPal.initialize(config.payments);


exports.ipn = function(req, res) {
	var payment = req.payment;
    // do shit with payment { transaction, method, status, reference }
};


exports.makeOrder = function(req, res) {
	var payment   = req.payment;
	var ref_no    = req.ref_no;
	var item      = req.item;
	var price     = req.price;
	var currency  = req.currency;
	var email     = req.email;

	var customer = new PesaPal.Customer(email);
	var order = new PesaPal.Order(ref_no, customer, item, price, currency, "MERCHANT");

	// Redirect user to PesaPal
	var url = PesaPal.getPaymentURL(order, "http://127.0.0.1/ouathCallBack");
};
