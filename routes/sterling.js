const express = require('express');
const router = express.Router();
const http = require('http');
const https = require('https');

router.post('/get-demo', (req, res, next) => {   
    var inputXML = '<Order CustomerFirstName="John" CustomerLastName="Wright" '+
    'EnterpriseCode="CPO" DocumentType="0001" />';

    var postheaders = {
        'Content-Type' : 'application/xml',
        'Content-Length' : Buffer.byteLength(inputXML)
    };

    // the post options
    var optionsget = {
        host : 'vtsteasz2-01',
        port : 8080,
        path : '/smcfs/restapi/executeFlow/inf_getOrderList_Dattu',
        method : 'POST',
        headers : postheaders
    };

    var reqGet = http.request(optionsget, function(data) {
    
        var body = '';
        var result = '';
    
        data.on('data', (chunk) => {
            body += chunk;
        });
    
        data.on('end', () => {
            result = JSON.parse(body);
            console.log(result);
            res.json({ success: false, msg: 'Data Posted '+ JSON.stringify(result) });
        });
    
    });

    reqGet.write(inputXML);
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error('Error Caught',e);
        res.json({ success: true, msg: 'Error Occured' });
    });
});

// Get orders list by email id.
router.post('/get-orders-list', (req, res, next) => {   
    var inputXML = '<Order CustomerEMailID="'+req.body.userMail+'" '+
    'EnterpriseCode="CPO" DocumentType="0001" />';

    var postheaders = {
        'Content-Type' : 'application/xml',
        'Content-Length' : Buffer.byteLength(inputXML)
    };

    // the post options
    var optionspost = {
        host : 'vtsteasz2-01',
        port : 8080,
        path : '/smcfs/restapi/executeFlow/inf_getOrderList_Dattu',
        method : 'POST',
        headers : postheaders
    };

    var reqGet = http.request(optionspost, function(data) {
    
        var body = '';
    
        data.on('data', (chunk) => {
            body += chunk;
        });
    
        data.on('end', () => {
            console.log(JSON.parse(body));
            res.json({ success: true, msg: 'List of orders retrieved', result: body });
        });
    
    });

    reqGet.write(inputXML);
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error('Error Caught',e);
        res.json({ success: false, msg: 'Error Occured', result: e });
    });
});

// Get order details by order number.
router.post('/order-details', (req, res, next) => {   
    var inputXML = '<Order OrderNo="'+req.body.orderNo+'" '+
    'EnterpriseCode="CPO" DocumentType="0001" />';

    var postheaders = {
        'Content-Type' : 'application/xml',
        'Content-Length' : Buffer.byteLength(inputXML)
    };

    // the post options
    var optionspost = {
        host : 'vtsteasz2-01',
        port : 8080,
        path : '/smcfs/restapi/invoke/getOrderDetails',
        method : 'POST',
        headers : postheaders
    };

    var reqGet = http.request(optionspost, function(data) {
    
        var body = '';
    
        data.on('data', (chunk) => {
            body += chunk;
        });
    
        data.on('end', () => {
            console.log(JSON.parse(body));
            res.json({ success: true, msg: 'Order Data retrieved', result: body});
        });
    
    });

    reqGet.write(inputXML);
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error('Error Caught',e);
        res.json({ success: false, msg: 'Order details could not be retrieved', result: e });
    });
});

// Cancel order by order number.
router.post('/cancel-order', (req, res, next) => {   
    var inputXML = '<Order OrderNo="'+req.body.orderNo+'" '+
    'EnterpriseCode="CPO" DocumentType="0001" />';

    var postheaders = {
        'Content-Type' : 'application/xml',
        'Content-Length' : Buffer.byteLength(inputXML)
    };

    // the post options
    var optionspost = {
        host : 'vtsteasz2-01',
        port : 8080,
        path : '/smcfs/restapi/invoke/cancelOrder',
        method : 'POST',
        headers : postheaders
    };

    var reqGet = http.request(optionspost, function(data) {
    
        var body = '';
    
        data.on('data', (chunk) => {
            body += chunk;
        });
    
        data.on('end', () => {
            console.log(JSON.parse(body));
            res.json({ success: true, msg: 'Order Cancelled', result: body });
        });
    
    });

    reqGet.write(inputXML);
    reqGet.end();
    reqGet.on('error', function(e) {
        console.error('Error Caught',e);
        res.json({ success: false, msg: 'Order could not be cancelled ', result: e });
    });
});

module.exports = router;
