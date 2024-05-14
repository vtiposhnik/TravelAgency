"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tourSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Tour = mongoose_1.default.model('Tour', tourSchema);
exports.default = Tour;
