var config = require('../config');
var redis = require('redis');
var r = require('request').defaults({
    json: true
});

var client = redis.createClient(6379, process.env.IP || '127.0.0.1');
module.exports = function() {
    //get all
    function getAll(req, res) {
        var cacheKey = req.originalUrl;
        var id = new Date().toLocaleString();
        console.log('enter' + id);
        client.get(cacheKey, function(error, data) {
            if (error) { throw error; };
            if (data) {
                console.log(req.originalUrl);
                console.log('(from cache):' + data.length);
                console.log(id);
                res.json(JSON.parse(data));
            } else {
                console.log('call api');
                r({ uri: config.services.test_local }, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        //console.log(body.data);
                        client.setex(cacheKey, 10 ,JSON.stringify(body.data), function(error) {
                            if (error) { throw error; };
                        });
                        console.log(req.originalUrl);
                        console.log('(from db):' + body.data.length);
                        console.log(id + new Date().toLocaleString());
                        res.json({ time: new Date().toLocaleString(), data : body.data });
                    } else {
                        console.log(response.statusCode);
                    }
                });
            }
        });
    };

    //get by id
    function get(req, res) {
        // Invoice.findById(req.params.id, function(err, invoice) {
        //     if (err) {
        //         res.json({ info: 'error during search.', error: err });
        //     }
        //     if (invoice) {
        //         res.json({ info: 'invoice found.', data: invoice });
        //     } else {
        //         res.json({ info: 'invoice not found.' });
        //     }
        // });
    };

    //add new
    function create(req, res) {
        // var newInvoice = new Invoice(req.body);
        // newInvoice.save(function(err) {
        //     if (err) {
        //         res.json({ info: 'error during create.' });
        //     }
        //     res.json({ info: 'invoice created successfully.' });
        // });
    };

    //update
    function update(req, res) {
        // Invoice.findById(req.params.id, function(err, invoice) {
        //     if (err) {
        //         res.json({ info: 'error during update.', error: err });
        //     }

        //     if (invoice) {
        //         _.merge(invoice, req.body);
        //         Invoice.save(function(err) {
        //             if (err) {
        //                 res.json({ info: 'error during update.', error: err });
        //             }
        //             res.json({ info: 'invoice updated.' });
        //         });
        //     } else {
        //         res.json({ info: 'invoice not found.' });
        //     }
        // });
    };

    //delete
    function deleteInv(req, res) {
        // Invoice.findByIdAndRemove(req.params.id, function(err) {
        //     if (err) {
        //         res.json({ info: 'error during delete.', error: err });
        //     }

        //     res.json({ info: 'invoice deleted.' });
        // });
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