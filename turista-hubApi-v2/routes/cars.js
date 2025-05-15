import express from 'express'
import {addCar , updateCar ,deleteCar ,getAllCar ,getSingleCar ,getCarCount} from '../controllers/carController.js'

const router = express.Router()


//add new Car
router.post('/' , addCar)

//update Car
router.put('/:id' , updateCar)

//delete Car
router.delete('/:id' , deleteCar)

//get single Car
router.get('/:id' , getSingleCar)

//get all Car
router.get('/' , getAllCar)



//get Car count
router.get('/count' , getCarCount)

//get Car by search




export default router;