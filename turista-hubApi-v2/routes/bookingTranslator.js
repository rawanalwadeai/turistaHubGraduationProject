import express from "express"

import { verifyAdmin, verifyUser } from "../utils/verifyToen.js"
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingTranslatorController.js"
const router = express.Router()


router.post('/:transltorId'  ,createBooking)
router.get('/:id'  ,getBooking)
router.get('/'  ,getAllBooking)


export default router