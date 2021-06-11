exports.dumpData = (obj) => JSON.stringify(obj, null, 2);
const fs = require('fs');

exports.cars = ['AUDI', 'BMW', 'CITROEN', 'DACIA', 'FIAT', 'FORD',
'HONDA', 'HYUNDAI', 'INFINITI', 'KIA', 'LEXUS', 'MAZDA',
'MERCEDES-BENZ', 'NISSAN', 'OPEL', 'PEUGEOT', 'RENAULT', 'SEAT',
'SKODA', 'SUBARU', 'SUZUKI', 'TOYOTA', 'VOLKSWAGEN', 'VOLVO']

exports.kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
