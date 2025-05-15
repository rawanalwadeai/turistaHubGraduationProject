import mongoose from "mongoose";

const bookingHouseSchema = new mongoose.Schema(

{


houseId: {
      type: String,
      ref: "Houses",
    },
    userEmail: {
      type: String,
    },
    placeName: {
        type:String,
        required:true
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
        type:Number,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    bookAt: {
        type:Date,
        required:true
    },

    bookEndAt: {
        type:Date,
    },


  },
  { timestamps: true }


)


export default mongoose.model("BookingHouse", bookingHouseSchema);