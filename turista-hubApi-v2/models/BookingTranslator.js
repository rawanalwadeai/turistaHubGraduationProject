import mongoose from "mongoose";

const bookingTranslatorSchema = new mongoose.Schema(
  { 
    
   
    translatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Translator",
    },
     userId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userEmail: {
      type: String,
    },
    translatorName : {
      type:String
    },
    // translatorName: {
    //     type:String,
    //     required:true
    // },
    fullName: {
      type: String,
      required: true,
    },
  
    phone: {
        type:String,
        required:true
    },
   
  
  
  },
  { timestamps: true }
);

export default mongoose.model("BookingTranslator", bookingTranslatorSchema);