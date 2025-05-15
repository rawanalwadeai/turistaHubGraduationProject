import mongoose from "mongoose";

const bookingBoatSchema = new mongoose.Schema(
  {
    boatId: {
      type: String,
      ref: "Boat", // نربط المستخدم بالموديل الخاص بالمستخدمين
    },
    userEmail: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    boatName: {
      type: String,
      required: true,
    },
    // boatType: {
    //   type: String,
    //   required: true,
    //   enum: ["yacht", "fishing", "sailing", "speed"],
    // },
    phone: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
  
    
    rentalHours : {
        type: Number,
        required:true
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("BookingBoat", bookingBoatSchema);
