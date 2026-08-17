const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalCartValue: {
      type: Number,
      min: 0,
      required: true,
    },
    cartItems: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        subtotal: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: [
          'pending',
          'accepted',
          'preparing',
          'out-for-delivery',
          'delivered',
          'cancelled',
          'rejected',
        ],
        message: '{VALUE} is not a valid order status',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
