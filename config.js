module.exports = {
    'web': {
        'parentPort' : '80',
        'invoicePort' : '8080'
    },
    "db": {
    	//"mongodb": "mongodb://localhost/nodejs_test"
        //"mongodb": "mongodb://username:password@dsXXXXX.mongolab.com:45077/databasename"
        //"mongodb": "mongodb://eric_soo-nodejs_test-2781489:27017/nodejs_test"
        //MONGLAB
        "mongodb": "mongodb://nodejs_test:123456@ds028559.mlab.com:28559/MongoLab-ao"

    },
    "logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    },
    "services": {
        "test": 'https://nodejs-test-eric-soo.c9users.io:' + process.env.PORT + '/api/invoices',
        "test_local": 'http://localhost:8080/api/invoices',
    }
};