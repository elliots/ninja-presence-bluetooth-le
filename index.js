var Presence = require('ninja-presence-base');

module.exports = Presence;

Presence.prototype.G = 'bluetoothle';
Presence.prototype.V = 0;
Presence.prototype.D = 263;
Presence.prototype.name = 'Presence - Bluetooth LE';
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
