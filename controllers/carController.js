const mongoose = require('mongoose');
const Car = mongoose.model('Car');
const Episode = mongoose.model('Episode');

exports.getCars = async (req, res) => {
    const cars = await Car.find();
    const accidents = await Episode.getAccidents();
    const wspolczynnikDzbana = Car.obliczWspolczynnikDzbana(cars, accidents);
    res.render('home', { title: 'Strona główna', cars, accidents, wspolczynnikDzbana });
};

exports.about = async (req, res) => {
    res.render('about', { title: 'O projekcie' });
};