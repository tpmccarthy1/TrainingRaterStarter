pe = require('parse-error');
 
to = function(promise){
    return promise
    .then(data => {
        return [null, data];
    }).catch(err => [pe(err)]);
};

