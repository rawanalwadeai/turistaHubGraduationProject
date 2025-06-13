import express from "express";

import { createBooking ,getAllBooking ,getBooking , getUnavailableCar} from "../controllers/bookingCarController.js";
const router = express.Router()


router.post('/:carId' , createBooking)
router.get('/:id' , getBooking)
router.get('/' , getAllBooking)
router.get('/unavailable/:carId' , getUnavailableCar)

export default router