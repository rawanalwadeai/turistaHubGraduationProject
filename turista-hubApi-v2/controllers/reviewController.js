import Tour from '../models/Tour.js';
import Houses from '../models/Houses.js';
import Review from '../models/Review.js';
import Cars from '../models/Cars.js';
import Boat from '../models/Boat.js';
import Translator from '../models/Translator.js';

export const createReview = async (req, res) => {
  const { targetType, targetId } = req.params;

  // نحول النوع اللي في الرابط إلى اسم موديل صحيح
  const modelType =
    targetType === 'tours' ? 'Tour' :
    targetType === 'houses' ? 'House' :
    targetType === 'cars' ? 'Car' :
    targetType === 'translator' ? 'Translator' :
    targetType === 'boats' ? 'Boat' :

    null;

  // لو النوع مو معروف، نرجع خطأ
  if (!modelType) {
    return res.status(400).json({
      success: false,
      message: 'Invalid target type. Must be "tours" , "houses" , "cars  or "translator" , "boat ',
    });
  }

  // إنشاء مراجعة جديدة، مع إضافة النوع والمعرّف
  const newReview = new Review({
    ...req.body,
    productType: modelType,  // لازم يكون مطابق للموديل
    productId: targetId,
  });

  try {
    // نحفظ الريفيو بالداتا بيس
    const savedReview = await newReview.save();

    // نربط الريفيو بالموديل المناسب (تور أو هاوس)
    if (modelType === 'Tour') {
      await Tour.findByIdAndUpdate(targetId, {
        $push: { reviews: savedReview._id },
      });
    } else if (modelType === 'House') {
      await Houses.findByIdAndUpdate(targetId, {
        $push: { reviews: savedReview._id },
      });
    }
    else if (modelType === 'Car') {
      await Cars.findByIdAndUpdate(targetId, {
        $push: { reviews: savedReview._id },
      });
    }
      else if (modelType === 'Translator') {
        await Translator.findByIdAndUpdate(targetId, {
          $push: { reviews: savedReview._id },
        });
    }

    else if (modelType === 'Boat') {
      await Boat.findByIdAndUpdate(targetId, {
        $push: { reviews: savedReview._id },
      });
  }

    // نرجع الرد
    res.status(200).json({
      success: true,
      message: 'Review submitted successfully.',
      data: savedReview,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: ' Rating (stars) is required ',
      error:err.message
    });
  }
};
