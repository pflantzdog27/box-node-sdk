// include the path module so that the res.sendFile path is correct and doesn't error out
var express = require('express'),
    path = require('path'),
    BoxSDK = require('box-node-sdk'),
    util = require('util');

// BOX SDK stuff
var CLIENT_ID = 'kvg6uknpglsiyfuzo8uuv5erqniiwgyd',
    CLIENT_SECRET = 'cfbh0j4wNy3geFSRlqTwVu7zkDn9rs8D',
    PUBLIC_KEY_ID = 'puwgmsld',
    PRIVATE_KEY_PATH = './private_key.pem',
    PRIVATE_KEY_PASSPHRASE = 'CBSpassword123',
    ENTERPRISE_ID = '862773';

var devToken = 'tnPYU4n4Mu0FFYkiwdnqNQnm6nMSJy6g'; //this expires in about 1 hour

var sdk = new BoxSDK({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

 

module.exports = function(app) {
    // SERVER ROUTES =============================================    
    var router = express.Router(); //initiate router
    // SERVER ROUTES ========================================================
    
    // user authentication middleware
    router.use(function(req,res,next) {
        //create a basic API client -- ultimately this needs to be updated to use a persistent client but I can't figure that out yet
        req.sdk = sdk.getBasicClient(devToken);
        next();
    });
    
    router.get('/',function(req,res) {
        res.json({message: 'Hooray! Welcome to our Api'});
    });

    //routes for files
    router.route('/files')
        .get(function(req,res) {
            //get files by folder id.
            req.sdk.folders.getItems(
                '0',
                {
                    fields: 'name,modified_at,modified_by,created_at,created_by,size,url,permissions,sync_state',
                    offset: 0,
                    limit: 25
                },function(err,data) {
                    if(err) {
                        res.json({
                            error: err,
                            errorDetails: util.inspect(err)
                        })
                        return;
                    }
                    res.json({
                        files: data ? data.entries: []
                    });
                }
            );
        });
    
    
    // API by default will use /api  (so "/" directs to /api/)
    app.use('/api', router);
    
    // FRONTEND ROUTES =============================================
    
    //route to handle all angular requests 
    //think this route needs to be last
    app.get('*',function(req,res) {
        res.sendFile(path.join(__dirname,'../public/views/index.html')); //load public/index.html file
    });
    
};

