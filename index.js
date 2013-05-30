var Presence = require('ninja-presence-base');


module.exports = Presence;

Presence.prototype.G = 'bluetoothle';
Presence.prototype.scan = function() {
  var self = this;

  var noble = require('noble');

  noble.on('stateChange', function(state) {
    self._app.log.debug('State change', state);
    if (state === 'poweredOn') {

      noble.startScanning();
    } else {
      noble.stopScanning();
    }
  });

  noble.on('scanStart', function() {
    self._app.log.info('Starting scan');
  });

  noble.on('scanStop', function() {
    self._app.log.info('Stopping scan');
  });
  noble.on('discover', function(peripheral) {
      self.see({
            name: peripheral.advertisement.localName,
            id: peripheral.uuid,
            distance: Math.abs(peripheral.rssi)
      });
  });

};


/*
ALERT ALL THE THINGS

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
*/
