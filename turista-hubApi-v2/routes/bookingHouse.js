// routes/bookingHouse.js

import express from 'express';
import { createHouseBooking, getHouseBooking, getAllHouseBookings ,getUnavailableHouse } from '../controllers/bookingHouseController.js';

const router = express.Router();

router.post('/:houseId', createHouseBooking);
router.get('/:id', getHouseBooking);
router.get('/', getAllHouseBookings);
router.get('/unavailable/:houseId' , getUnavailableHouse)

export default router;
