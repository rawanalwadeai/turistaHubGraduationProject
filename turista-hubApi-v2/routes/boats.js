// routes/boat.js

import express from 'express';
import {
  addBoat,
  updateBoat,
  deleteBoat,
  getSingleBoat,
  getAllBoats,
  getBoatCount,
  searchBoats,
  getFeaturedBoats
} from '../controllers/boatController.js';

const router = express.Router();

// إنشاء قارب جديد
router.post('/', addBoat);

// تعديل قارب
router.put('/:id', updateBoat);

// حذف قارب
router.delete('/:id', deleteBoat);

// الحصول على قارب محدد
router.get('/:id', getSingleBoat);

// جميع القوارب (مع pagination)
router.get('/', getAllBoats);

// عدد القوارب
router.get('/count', getBoatCount);

// بحث
router.get('/search', searchBoats);

// القوارب المميزة
router.get('/featured/getFeaturedBoats', getFeaturedBoats);


export default router;
