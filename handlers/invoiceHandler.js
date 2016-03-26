var _ = require('lodash');
var Invoice = require('../models/invoice_model.js');

module.exports = function(){
    //get all
    function getAll(req, res){
       /*res.send(_invoices); */
       Invoice.find(function(err, invoices){
       		if(err){
    			res.json({info: 'error during search.', error: err});
    		}
    		setTimeout(function(){
    		    res.json({info: 'invoices found.', data: invoices});    
    		}, 3000);
    		
       });
    };
    
    //get by id
    function get(req, res){
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
    };
    
    //add new
    function create(req, res){
    	var newInvoice = new Invoice(req.body);
    	newInvoice.save(function(err){
    		if(err){
    			res.json({info: 'error during create.'});
    		}
    		res.json({info: 'invoice created successfully.'});
    	});
    };
    
    //update
    function update(req, res){
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
    };
    
    //delete
    function deleteInv(req, res){
    	Invoice.findByIdAndRemove(req.params.id, function(err){
    		if(err){
    			res.json({info: 'error during delete.', error: err});
    		}

    		res.json({info: 'invoice deleted.'});
    	});
    };
    
    var publicAPI = {
        get: get,
        getAll: getAll,
        create: create,
        update: update,
        deleteInv: deleteInv
    }

    return publicAPI;
	
}