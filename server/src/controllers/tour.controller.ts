import { Request, Response, NextFunction } from "express"
import Tour from "../models/tour.model"
import { CustomError } from "../util/interfaces"

export const ErrorHandler = (statusCode: number, errorMsg: string) => {
    const error: CustomError = new Error()
    error.message = errorMsg
    error.statusCode = statusCode
    return error
}

export const getTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tour = await Tour.findOne({
            ...(req.query && { slug: req.query.slug })
        })
        console.log(tour, "ANDDD", req.query)

        res.status(201).json({ message: "Tour successfully retreated!", success: true, tour: tour })
    }
    catch (error) {
        next(error)
    }
}

export const getTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tours = await Tour.find({})

        if (!tours) {
            return next(ErrorHandler(404, "No Tours in DB"))
        }

        res.status(201).json({ message: "Tours successfully retreated!", success: true, tours: tours })
    }
    catch (error) {
        next(error)
    }
}

export const addTours = async (req: Request, res: Response, next: NextFunction) => {
    // const { name, duration, maxPeople, difficulty, ratingAvg, price, summary, description, coverImg } = req.body


    const title: string = req.body.name || 'Untitled'
    const tour = await Tour.findOne({ name: title })

    if (tour?.name.toLowerCase() === title.toLowerCase()) {
        return next(ErrorHandler(401, "Tour with the same name already exists!"))
    }

    const slug = title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    try {
        const newTour = await Tour.create({
            ...req.body,
            slug
        })

        res.status(201).json({ message: 'Tour added to DB', success: true, tour: newTour })
    }
    catch (error) {
        next(error)
    }
}

export const deleteTour = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    console.log(req.body)

    try {
        const tour = await Tour.find({ _id: id })

        if (JSON.stringify(tour) === '[]') {
            console.log(tour);
            return next(ErrorHandler(404, "No such tour with specified ID!"))
        }

        await Tour.findByIdAndDelete(id)

        res.status(201).json({ message: "Tour successfully deleted!", tour: tour })
    } catch (error) {
        next(error)
    }
}

export const getTourByID = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body

    try {
        const tour = await Tour.findById(id)

        if (!tour) {
            return next(ErrorHandler(404, "No such tour by this ID!"))
        }

        res.status(201).json({ message: "Tour retreated", success: true, tour: tour })
    } catch (error) {
        next(error)
    }
}