const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: 'Car brand is required'
  },
  numberOfCars: {
    type: Number,
    default: 0,
    required: 'Number of cars is required'
  }
});

carSchema.statics.obliczWspolczynnikDzbana = function (cars, accidents) {
  const sumOfCars = Object.values(
    cars.reduce((a, b) => ({
      numberOfCars: a.numberOfCars + b.numberOfCars
    })));
  let dataToReturn = {}

  cars.forEach(car => {
    percentOfCars = car.numberOfCars / sumOfCars * 100
    percentOfAccidents = accidents[0][car.brand] / accidents[0].totalAccidents * 100
    dzbanowatosc = (Math.round((percentOfAccidents - percentOfCars) * 1000) / 1000).toString().replace('.', ',');
    const tempBrand = car.brand

    if (car.accidentsCaused < 10) {
      dataToReturn[tempBrand] = `Zbyt mało danych`;
    } else {
      dataToReturn[tempBrand] = dzbanowatosc;
    }
  });

  return dataToReturn;
};

module.exports = mongoose.model('Car', carSchema);