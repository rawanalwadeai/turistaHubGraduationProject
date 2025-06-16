import BookingCar from "../models/BookingCar.js";
import { sendEmail } from '../utils/email.js'

export const createBooking = async (req ,res) => {
    const newBooking = new BookingCar(req.body)

try{
 const savedBooking = await newBooking.save()

 
         await sendEmail( 
   savedBooking.userEmail,
   'Booking Received – Awaiting Payment',
   `Dear ${savedBooking.fullName},\n\nWe have received your booking for the car .\n\nYour booking is currently pending until the payment is completed.\n\nThank you for choosing our service!`
 )

 
    res.status(200).json({
        success:true,
        message:'Car is booked',
        data:savedBooking,

    })
}
catch(err){
   res.status(500).json({
    success:false,
    message:"internal sever error"

   })
}

}


//get single booking
export const getBooking = async (req ,res) =>{
    const id = req.params.id

    try{
        const book = await BookingCar.findById(id)

        res.status(200).json({
            success:true,
            message:'succesful',
            data:book
        })



    } catch(err){
        res.status(500).json({
                  success:false,
        message:"internal sever error"
        })
  
    }
}



//get all booking 
export const getAllBooking = async (req,res) => {
    
    try{
        const allBooking = await BookingCar.find()

        res.status(200).json({
            success:true,
            message:'succesful',
            data:allBooking
        })
    }
    catch(err){
        res.status(500).json({
                  success:false,
        message:"internal sever error"
        })
}
}



export const getUnavailableCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const bookings = await BookingCar.find({ carId });
    
    // تحويل كل حجز إلى قائمة تواريخ
    let allUnavailableDates = [];
    bookings.forEach(booking => {
      const start = new Date(booking.pickupDate);
      const end = new Date(booking.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        allUnavailableDates.push(new Date(d));
      }
    });

    res.json(allUnavailableDates);
  } catch (err) {
    res.status(500).json({ message: 'There is an Error' });
  }
};

