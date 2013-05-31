
var noble = require('noble');

console.log('Note: You\'ll probably have to flick the thing four times to make it work...');

noble.on('stateChange', function(state) {
  console.log('state change', state);
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('on -> discover: ' + peripheral);

  peripheral.on('connect', function() {
    console.log('on -> connect');
    this.discoverServices();
  });

  peripheral.on('servicesDiscover', function(services) {
    console.log('on -> peripheral services discovered ',services);

    services.forEach(function(service) {
      if (service.type == 'org.bluetooth.service.immediate_alert') {
        service.on('characteristicsDiscover', function(characteristics) {
           characteristics[0].on('write', function() {
            console.log('on -> characteristic write ');

            peripheral.disconnect();
          });
          characteristics[0].write(new Buffer('3'));
        });
        service.discoverCharacteristics();
      }
    });

  });

  peripheral.connect();
});
