import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    images: [String],
    duration: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    startLoc: {
        type: String,
        default: 'Yet to be decided!'
    },
    difficulty: {
        type: String,
        required: true
    },
    ratingAvg: {
        type: Number,
        required: true,
        default: 3.8
    },

}, { timestamps: true })

const Tour = mongoose.model('Tour', tourSchema)

export default Tour;