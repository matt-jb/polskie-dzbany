const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { kebabCase } = require('../helpers');

const Schema = mongoose.Schema;

const episodeSchema = new mongoose.Schema({
    series: {
        type: String,
        required: 'Series name is required'
    },
    episodeNumber: {
        type: Number,
        trim: true,
        required: 'Episode number is required'
    },
    created: {
        type: Date,
        default: Date.now,
        required: 'Date of uploading the episode is required'
    },
    slug: String,
    brandsInEpisode: {
        AUDI: {
            type: Number,
            default: 0
        },
        BMW: {
            type: Number,
            default: 0
        },
        CITROEN: {
            type: Number,
            default: 0
        },
        DACIA: {
            type: Number,
            default: 0
        },
        FIAT: {
            type: Number,
            default: 0
        },
        FORD: {
            type: Number,
            default: 0
        },
        HONDA: {
            type: Number,
            default: 0
        },
        HYUNDAI: {
            type: Number,
            default: 0
        },
        INFINITI: {
            type: Number,
            default: 0
        },
        KIA: {
            type: Number,
            default: 0
        },
        LEXUS: {
            type: Number,
            default: 0
        },
        MAZDA: {
            type: Number,
            default: 0
        },
        'MERCEDES-BENZ': {
            type: Number,
            default: 0
        },
        NISSAN: {
            type: Number,
            default: 0
        },
        OPEL: {
            type: Number,
            default: 0
        },
        PEUGEOT: {
            type: Number,
            default: 0
        },
        RENAULT: {
            type: Number,
            default: 0
        },
        SEAT: {
            type: Number,
            default: 0
        },
        SKODA: {
            type: Number,
            default: 0
        },
        SUBARU: {
            type: Number,
            default: 0
        },
        SUZUKI: {
            type: Number,
            default: 0
        },
        TOYOTA: {
            type: Number,
            default: 0
        },
        VOLKSWAGEN: {
            type: Number,
            default: 0
        },
        VOLVO: {
            type: Number,
            default: 0
        },
    }
});

episodeSchema.index({ series: 1, episodeNumber: 1, }, { unique: true, });

episodeSchema.pre('save', function (next) {
    const mySlug = `${kebabCase(this.series)}-${this.episodeNumber}`
    this.slug = mySlug;
    next();
});

episodeSchema.virtual('comments', {
    ref: 'Comment', // what model to link?
    localField: '_id', // which field on the episode?
    foreignField: 'episode' // which field on the comment?
});

episodeSchema.set('toJSON', { virtuals: true }),
episodeSchema.set('toObject', { virtuals: true }),

    episodeSchema.statics.getAccidents = function () {
        return this.aggregate([{
            $group: {
                _id: null,
                AUDI: { $sum: "$brandsInEpisode.AUDI" },
                BMW: { $sum: "$brandsInEpisode.BMW" },
                CITROEN: { $sum: "$brandsInEpisode.CITROEN" },
                DACIA: { $sum: "$brandsInEpisode.DACIA" },
                FIAT: { $sum: "$brandsInEpisode.FIAT" },
                FORD: { $sum: "$brandsInEpisode.FORD" },
                HONDA: { $sum: "$brandsInEpisode.HONDA" },
                HYUNDAI: { $sum: "$brandsInEpisode.HYUNDAI" },
                INFINITI: { $sum: "$brandsInEpisode.INFINITI" },
                KIA: { $sum: "$brandsInEpisode.KIA" },
                LEXUS: { $sum: "$brandsInEpisode.LEXUS" },
                MAZDA: { $sum: "$brandsInEpisode.MAZDA" },
                'MERCEDES-BENZ': { $sum: "$brandsInEpisode.MERCEDES-BENZ" },
                NISSAN: { $sum: "$brandsInEpisode.NISSAN" },
                OPEL: { $sum: "$brandsInEpisode.OPEL" },
                PEUGEOT: { $sum: "$brandsInEpisode.PEUGEOT" },
                RENAULT: { $sum: "$brandsInEpisode.RENAULT" },
                SEAT: { $sum: "$brandsInEpisode.SEAT" },
                SKODA: { $sum: "$brandsInEpisode.SKODA" },
                SUBARU: { $sum: "$brandsInEpisode.SUBARU" },
                SUZUKI: { $sum: "$brandsInEpisode.SUZUKI" },
                TOYOTA: { $sum: "$brandsInEpisode.TOYOTA" },
                VOLKSWAGEN: { $sum: "$brandsInEpisode.VOLKSWAGEN" },
                VOLVO: { $sum: "$brandsInEpisode.VOLVO" }
            }
        }, { $addFields: {
                'totalAccidents': {
                    $sum: [ "$AUDI", "$BMW", "$CITROEN", "$DACIA",
                    "$FIAT", "$FORD", "$HONDA", "$HYUNDAI",
                    "$INFINITI", "$KIA", "$LEXUS", "$MAZDA",
                    "$MERCEDES-BENZ", "$NISSAN", "$OPEL",
                    "$PEUGEOT", "$RENAULT", "$SEAT", "$SKODA",
                    "$SUBARU", "$SUZUKI", "$TOYOTA", "$VOLKSWAGEN",
                    "$VOLVO" ] } }
        }]);
    }

module.exports = mongoose.model('Episode', episodeSchema);