import express from "express";

// import { verifyUser } from "../utils/verifyToen.js";
import {
  createBoatBooking,
  getAllBoatBookings,
  getBoatBooking,
  getUnavailableBoatDates
} from "../controllers/bookingBoatController.js";

const router = express.Router();

// إنشاء حجز بوت جديد
router.post('/:boatId', createBoatBooking);

// الحصول على حجز بوت واحد عبر ID
router.get('/:id', getBoatBooking);

// الحصول على كل الحجوزات
router.get('/', getAllBoatBookings);
router.get('/disabled-times/:boatId' ,  getUnavailableBoatDates)

export default router;
