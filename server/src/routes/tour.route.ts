import {Router} from 'express'
import { addTours, deleteTour, getTour, getTourByID, getTours } from '../controllers/tour.controller'

const router = Router()

router.get('/getTours', getTours)
router.get('/getTour', getTour)
router.get('/getTourByID', getTourByID)
router.post('/addTour', addTours)
router.post('/deleteTour', deleteTour)

export default router;