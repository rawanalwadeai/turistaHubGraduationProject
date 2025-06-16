import User from '../models/User.js'
import BookingTour from '../models/BookingTour.js';
import BookingHouse from '../models/BookingHouse.js';
import BookingCar from '../models/BookingCar.js';
import BookingBoat from '../models/BookingBoat.js';


//create newUser 
export const createUser = async (req, res) => {

    const newUser = new User(req.body)


    try {


        const savedUser = await newUser.save()

        res.status(200).json({
            success: true,
            message: 'Successfuly created',
            data: savedUser
        })

    }

    catch (err) {
        res.status(500).json({success :false , message:'Failled to create, Try again'})

    }
}



//updateUser
export const ubdateUser = async(req,res) => {
   
   const id = req.params.id
   
    try{

        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body } , {new:true})

            
        res.status(200).json({
            success: true,
            message: 'Successfuly ubdated',
            data: ubdateUser
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'Failled to ubdate, Try again' })

    }
}


//deleetUser
export const deleteUser = async(req,res) => {
    const id = req.params.id
   
    try{

        await User.findByIdAndDelete
        (id)

            
        res.status(200).json({
            success: true,
            message: 'Successfuly deleted',
            
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'Failed to delete, Try again' })

    }
}



//get singleUser
export const getSingleUser = async(req,res) => {
    const id = req.params.id
   
    try{

        const user = await User.findById(id)

            
        res.status(200).json({
            success: true,
            message: 'Successfuly fetcheing',
            data:user
            
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'not found' })

    }
}


//get allUser
export const getAllUser = async(req,res) => {


    try{


        const users =  await User.find({})


       
        res.status(200).json({
            success: true,
            message: 'Successfuly fetching all',
            data:users
            
        })
        
    }
    catch (err){
        res.status(500).json({
            success :false ,
             message:'not found' })

    }
}

//get all bookings 
// Express example:
export const getAllBookings = async(req, res) => {
  const userId = req.params.id;

  // جلب الحجوزات من كل الكولكشنز باستخدام userId
  const tours = await BookingTour.find({ userId });
  const houses = await BookingHouse.find({ userId });
  const cars = await BookingCar.find({ userId  });
  const boats = await BookingBoat.find({ userId });
//   const translators = await BookingTranslator.find({ userId });

  res.json({ tours, houses, cars, boats });
};

