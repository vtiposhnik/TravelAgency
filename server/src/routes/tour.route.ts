import {Router} from 'express'
import { addTours, getTours } from '../controllers/tour.controller'

const router = Router()

router.get('/getTours', getTours)
router.post('/addTour', addTours)

export default router;