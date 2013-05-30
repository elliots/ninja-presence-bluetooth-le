var opts = {};

var d = new (require('index'))(opts, {
    on : function(x,cb){
        setTimeout(cb, 100);
    },
    log: {
        debug: console.log,
        info: console.log,
        warn: console.log,
        error: console.log
    }
});

d.emit = function(channel, value) {
    console.log('Driver.emit', channel, value);
    if (channel == 'register') {
        value.emit = function(channel, value) {
            console.log('Device.emit', channel, value);
        };
    }
};

d.save = function() {
    console.log('Saved opts', opts);
};
