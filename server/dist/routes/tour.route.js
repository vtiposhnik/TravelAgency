"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_controller_1 = require("../controllers/tour.controller");
const router = (0, express_1.Router)();
router.get('/getTours', tour_controller_1.getTours);
router.get('/getTour', tour_controller_1.getTour);
router.get('/getTourByID', tour_controller_1.getTourByID);
router.post('/addTour', tour_controller_1.addTours);
router.post('/deleteTour', tour_controller_1.deleteTour);
exports.default = router;
