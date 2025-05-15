import mongoose from "mongoose";

const translatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    expertiseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    photo:{
      type:String,

    },


    pricePerHour: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    availability: {
      type: [String],
      required: true,
    },
    specializations: {
      type: [String],
      required: true,
    },
    isCertified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Translator", translatorSchema);
