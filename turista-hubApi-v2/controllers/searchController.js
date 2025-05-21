import Tour from '../models/Tour.js';
import Houses from '../models/Houses.js';
import Cars from '../models/Cars.js';
import Boat from '../models/Boat.js';



export const getAllResults = async (req, res) => {
  const { city } = req.query;

  const query = {
    city: { $regex: new RegExp(city, 'i') },
  };

  
  try {
    const tours = await Tour.find(query).populate('reviews');
    const houses = await Houses.find(query);
    const cars = await Cars.find(query);
    const boats = await Boat.find(query);

    const results = [
      ...tours.map(item => ({ ...item._doc, type: 'tour' })),
      ...houses.map(item => ({ ...item._doc, type: 'houses' })),
      ...cars.map(item => ({ ...item._doc, type: 'car' })),
      ...boats.map(item => ({ ...item._doc, type: 'boat' })),
    ];

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};
