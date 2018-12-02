pe = require('parse-error');

// promise function
to = function(promise){
    return promise
    .then(data => {
        return [null, data];
    }).catch(err => [pe(err)]);
};

// error handling functions
// add to users and session controller
TE = function(errMessage, log) {
    if (log === true){
        console.error(errMessage);
    }
    throw new Error(errMessage);
};

// function to return error
ReE = function(res, err, code) {
    if(typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    if(typeof code !== 'undefined') {
        res.statusCode = code;
    }
    return res.json({success: false, error: err});
};

// function to call on success
ReS = function(res, data, code) {
    let sendData = { success: true };

    if (typeof data == 'object') {
        sendData = Object.assign(data, sendData);
    }

    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }
    
    return res.json(sendData);
};

