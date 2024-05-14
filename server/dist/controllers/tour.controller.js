"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourByID = exports.deleteTour = exports.addTours = exports.getTours = exports.getTour = exports.ErrorHandler = void 0;
const tour_model_1 = __importDefault(require("../models/tour.model"));
const ErrorHandler = (statusCode, errorMsg) => {
    const error = new Error();
    error.message = errorMsg;
    error.statusCode = statusCode;
    return error;
};
exports.ErrorHandler = ErrorHandler;
const getTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield tour_model_1.default.findOne(Object.assign({}, (req.query && { slug: req.query.slug })));
        console.log(tour, "ANDDD", req.query);
        res.status(201).json({ message: "Tour successfully retreated!", success: true, tour: tour });
    }
    catch (error) {
        next(error);
    }
});
exports.getTour = getTour;
const getTours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield tour_model_1.default.find({});
        if (!tours) {
            return next((0, exports.ErrorHandler)(404, "No Tours in DB"));
        }
        res.status(201).json({ message: "Tours successfully retreated!", success: true, tours: tours });
    }
    catch (error) {
        next(error);
    }
});
exports.getTours = getTours;
const addTours = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { name, duration, maxPeople, difficulty, ratingAvg, price, summary, description, coverImg } = req.body
    const title = req.body.name || 'Untitled';
    const tour = yield tour_model_1.default.findOne({ name: title });
    if ((tour === null || tour === void 0 ? void 0 : tour.name.toLowerCase()) === title.toLowerCase()) {
        return next((0, exports.ErrorHandler)(401, "Tour with the same name already exists!"));
    }
    const slug = title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    try {
        const newTour = yield tour_model_1.default.create(Object.assign(Object.assign({}, req.body), { slug }));
        res.status(201).json({ message: 'Tour added to DB', success: true, tour: newTour });
    }
    catch (error) {
        next(error);
    }
});
exports.addTours = addTours;
const deleteTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(req.body);
    try {
        const tour = yield tour_model_1.default.find({ _id: id });
        if (JSON.stringify(tour) === '[]') {
            console.log(tour);
            return next((0, exports.ErrorHandler)(404, "No such tour with specified ID!"));
        }
        yield tour_model_1.default.findByIdAndDelete(id);
        res.status(201).json({ message: "Tour successfully deleted!", tour: tour });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTour = deleteTour;
const getTourByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const tour = yield tour_model_1.default.findById(id);
        if (!tour) {
            return next((0, exports.ErrorHandler)(404, "No such tour by this ID!"));
        }
        res.status(201).json({ message: "Tour retreated", success: true, tour: tour });
    }
    catch (error) {
        next(error);
    }
});
exports.getTourByID = getTourByID;
