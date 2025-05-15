import mongoose from 'mongoose';

const boatSchema = new mongoose.Schema(
  {
    boat_name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    max_passengers: {
      type: Number,
      required: true,
    },

    price_per_hour: {
      type: Number,
      required: true,
    },

    image_url: {
      type: String,
      required: true,
    },

    company_name: {
      type: String,
      required: true,
    },

    featured: {
        type: Boolean,
        default: false,
      },

    features: {
      meals_provided: {
        type: Boolean,
        default: false,
      },
      music_system: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      air_conditioned: {
        type: Boolean,
        default: false,
      },
      tour_guide: {
        type: Boolean,
        default: false,
      },
      outdoor_seating: {
        type: Boolean,
        default: false,
      },
      swimming_allowed: {
        type: Boolean,
        default: false,
      },
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Boat', boatSchema);
