function setup(app, handlers) {
	app.get('/api/invoices/:id', handlers.parent.get);
	app.get('/api/invoices', handlers.parent.getAll);
	app.post('/api/invoices', handlers.parent.create);
	app.put('/api/invoices/:id', handlers.parent.update);
	app.delete('/api/invoices/:id', handlers.parent.deleteInv);
}

exports.setup = setup;