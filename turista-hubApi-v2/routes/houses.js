import express from 'express'
import {addPlace , updatePlace ,deletePlace ,getAllPlace ,getSinglePlace ,getPlaceCount} from '../controllers/houseController.js'

const router = express.Router()


//add new place
router.post('' , addPlace)

//update place
router.put('/:id' , updatePlace)

//delete place
router.delete('/:id' , deletePlace)

//get single place
router.get('/:id' , getSinglePlace)

//get all place
router.get('/' , getAllPlace)



//get place count
router.get('/search/getPlaceCount' , getPlaceCount)

//get place by search




export default router;