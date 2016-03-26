var mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    "invNo": String,
    "DebtorCode": String,
    "DebtorName": String,
    "InvoiceDate": Date,
});

module.exports = mongoose.model('Invoice', invoiceSchema);