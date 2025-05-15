import express from 'express'
import { createTour, getTourCount, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, ubdateTour } from '../controllers/tourController.js'



import { verifyAdmin } from '../utils/verifyToen.js'
 
const router = express.Router()


//create new tour 
router.post('/', createTour)

//ubdate  tour 
router.put('/:id' , ubdateTour)

//delete new tour 
router.delete('/:id' ,deleteTour)

//get sigle  tour 
router.get('/:id' , getSingleTour)

//get all  tour 
router.get('/' , getAllTour)


//get tour by search 
router.get('/search/getTourBySearch' , getTourBySearch)
router.get('/search/getFeaturedTour' , getFeaturedTour)
router.get('/search/getTourCount' , getTourCount);






export default router;