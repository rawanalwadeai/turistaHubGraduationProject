import mongoose from "mongoose";

const bookingCarSchema = new mongoose.Schema(


    {
 carId:{
    type:String,
    ref:'Cars'
 },

 userEmail :{
    type:String


 },
 fullName: {
    type:String,
    required:true
 },

 phone: {
    type:Number,
    required : true
 },
 rentalDays:{
    type:Number,
    required:true
 },
 pickupDate: {
    type:Date,
    required:true
 },
 returnDate: {
    type: Date, // نحسبه لاحقًا بناءً على pickupDate + rentalDays
  },

    },

   { timestamps:true}
)

export default mongoose.model("BookingCar", bookingCarSchema);