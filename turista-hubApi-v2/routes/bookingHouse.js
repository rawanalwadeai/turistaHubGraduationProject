// routes/bookingHouse.js

import express from 'express';
import { createHouseBooking, getHouseBooking, getAllHouseBookings } from '../controllers/bookingHouseController.js';

const router = express.Router();

router.post('/:houseId', createHouseBooking);
router.get('/:id', getHouseBooking);
router.get('/', getAllHouseBookings);

export default router;
