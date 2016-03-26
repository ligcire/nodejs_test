var _ = require('lodash');
var Invoice = require('./models/invoice_model.js');

module.exports = function invoiceApi(app){
    //_invoices = [];
    
	/*_invoices.push({
	    "invNo":"INV1010",
	    "DebtorCode":"P099321",
	    "DebtorName":"ABC SDN BHD",
	    "InvoiceDate":"23-Nov-15 11:02:17 PM",
	});

	_invoices.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('added');
	  }
	});*/
    
    //get all
    app.get('/invoice', function(req, res){
       /*res.send(_invoices); */
       Invoice.find(function(err, invoices){
       		if(err){
    			res.json({info: 'error during search.', error: err});
    		}
    		res.json({info: 'invoices found.', data: invoices});
       });
    });
    
    //get by id
    app.get('/invoice/:id', function(req, res){
    	Invoice.findById(req.params.id, function(err, invoice){
    		if(err){
    			res.json({info: 'error during search.', error: err});
    		}
    		if(invoice){
    			res.json({info: 'invoice found.', data: invoice});
    		} else {
    			res.json({info: 'invoice not found.'});
    		}
    	});
       /*res.send(
           _.find(
               _invoices,
               {
                    invNo: req.params.id
               }
            )
        );*/
    });
    
    //add new
    app.post('/invoice', function(req, res){
    	var newInvoice = new Invoice(req.body);
    	newInvoice.save(function(err){
    		if(err){
    			res.json({info: 'error during create.'});
    		}
    		res.json({info: 'invoice created successfully.'});
    	});
        /*_invoices.push(req.body);
        res.json({
            info: 'invoice created successfully.'
        });*/
    });
    
    //update
    app.put('/invoice/:id', function(req, res){
    	Invoice.findById(req.params.id, function(err, invoice){
    		if(err){
    			res.json({info: 'error during update.', error: err});
    		}

    		if(invoice){
    			_.merge(invoice, req.body);
    			Invoice.save(function(err){
    				if(err){
		    			res.json({info: 'error during update.', error: err});
		    		}
		    		res.json({info: 'invoice updated.'});
    			});
    		} else {
    			res.json({info: 'invoice not found.'});
    		}

    		
    	});
        /*var index = _.findIndex(
            _invoices, 
            {
                invNo: req.params.id
            }
        );
        _.merge(_invoices[index], req.body);
        res.json({
            info: 'invoice updated successfully.'
        });*/
    });
    
    //delete
    app.delete('/invoice/:id', function(req, res){
    	Invoice.findByIdAndRemove(req.params.id, function(err){
    		if(err){
    			res.json({info: 'error during delete.', error: err});
    		}

    		res.json({info: 'invoice deleted.'});
    	});
    		
		
    		
       /* _.remove(_invoices, function(invoice){
            return invoice.invNo === req.params.id;
        })
        res.json({
            info: 'invoice removed successfully.'
        });*/
    });
    
	
}