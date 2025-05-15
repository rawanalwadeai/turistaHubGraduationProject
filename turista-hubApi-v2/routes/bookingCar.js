import express from "express";

import { createBooking ,getAllBooking ,getBooking } from "../controllers/bookingCarController.js";
const router = express.Router()


router.post('/:carId' , createBooking)
router.get('/:id' , getBooking)
router.get('/' , getAllBooking)

export default router