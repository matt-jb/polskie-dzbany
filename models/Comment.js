const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'Autor komentarza jest wymagany.'
    },
    episode: {
        type: mongoose.Schema.ObjectId,
        ref: 'Episode',
        required: 'Odcinek jest wymagany.'
    },
    text: {
        type: String,
        required: 'Twój komentarz musi posiadać jakąś treść.'
    }
});

function autopopulate(next) {
    this.populate('author');
    next();
};

commentSchema.pre('find', autopopulate);
commentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Comment', commentSchema);