const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [10, 'Minimum Required Lenght is 10 Characters'],
      maxlength: [200, 'Maximum Lenght for name is 200 Characters'],
      lowercase: true,
      trim: true,
      required: [true, 'Food name is required'],
    },
    price: {
      type: Number,
      min: 1,
      max: 9999,
      required: [true, 'Food price is required'],
    },
    description: {
      type: String,
      minLength: [100, 'Minimum Required Lenght is 100 Characters'],
      maxlength: [500, 'Maximum Lenght for name is 500 Characters'],
      lowercase: true,
      trim: true,
      required: [true, 'Food description is required'],
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'all',
      index: true,
      enum: {
        values: [
          'all',
          'breakfast',
          'lunch',
          'dinner',
          'brunch',
          'beverage',
          'dessert',
          'sweet',
        ],
        message: '{VALUE} is not a valid option for category',
      },
    },
    foodType: {
      type: String,
      index: true,
      default: 'all',
      enum: {
        values: [
          'all',
          'veg',
          'non-veg',
          'gluten-free',
          'dairy-free',
          'vegan',
          'dairy',
        ],
        message: '{VALUE} is not a valid option for foodType',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

foodSchema.virtual('formattedPrice').get(function () {
  return `₹${this.price}`;
});

foodSchema.index({ category: 1 });
foodSchema.index({ foodType: 1 });

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;
