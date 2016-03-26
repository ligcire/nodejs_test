function setup(app, handlers) {
	app.get('/api/invoices/:id', handlers.invoice.get);
	app.get('/api/invoices', handlers.invoice.getAll);
	app.post('/api/invoices', handlers.invoice.create);
	app.put('/api/invoices/:id', handlers.invoice.update);
	app.delete('/api/invoices/:id', handlers.invoice.deleteInv);
}

exports.setup = setup;