import mongoose from "mongoose";

const bookingCarSchema = new mongoose.Schema(


    {
        userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

 carId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Cars'
 },

 userEmail :{
    type:String


 },

 carTitle: {
   type:String,
 },

 fullName: {
    type:String,
    required:true
 },

 phone: {
    type:String,
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
 endDate: {
    type: Date, // نحسبه لاحقًا بناءً على pickupDate + rentalDays
  },

  paymentStatus:{
      type:String,
      enum:["pending", "paid", "cancelled"],
      default:"pending"
    },
     bookAt: {
        type:Date,
        required:false,
         default: Date.now,
    },


    },

   { timestamps:true}
)

export default mongoose.model("BookingCar", bookingCarSchema);