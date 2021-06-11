const mongoose = require('mongoose');
const Episode = mongoose.model('Episode');

exports.addEpisode = (req, res) => {
    res.render('add', { title: 'Dodaj odcinek' });
};

exports.createEpisode = async (req, res) => {
    const episode = new Episode(req.body);
    await episode.save();
    
    req.flash('success', `Pomyślnie wprowadzono do bazy danych odcinek numer: ${episode.episodeNumber}`);
    res.redirect('/');
};

exports.getEpisodes = async (req, res) => {
    const episodes = await Episode.find();
    res.render('episodes', { title: 'Sprawdź nasze dane', episodes });
};

exports.editEpisode = async (req, res) => {
    const episode = await Episode.findOne({ slug: req.params.slug });
    res.render('add', { title: `Edytuj odcinek ${episode.series} ${episode.episodeNumber}`, episode });
};

exports.displayEpisode = async (req, res) => {
    const episode = await Episode.findOne({ slug: req.params.slug }).populate('comments');
    res.render('episode', { title: `Odcinek ${episode.series} ${episode.episodeNumber}`, episode });
};

exports.updateEpisode = async (req, res) => {
    const newEpisode = await Episode.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    req.flash('success', `Pomyślnie zmodyfikowano odcinek numer: ${newEpisode.episodeNumber}`);
    res.redirect(`/episodes/${newEpisode.slug}/edit`);
};
