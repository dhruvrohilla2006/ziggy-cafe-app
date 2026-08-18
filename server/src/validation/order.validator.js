const z = require('zod');

const CreateOrder = z.object({
  cartItems: z.array(
    z.object({
      itemTotal: z.number().gte(1, {
        message: 'Order Item Total Minimum Should be Greater than 1',
      }),

      itemId: z.string(),

      quantity: z.number().gte(1, {
        message: 'Item Quantity Must be Greater than 1',
      }),
    })
  ),

  cartTotal: z.number(),
});

 const updateOrderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "accepted",
    "preparing",
    "out-for-delivery",
    "delivered",
    "cancelled",
    "rejected",
  ]),
})

module.exports = {
  CreateOrder,
  updateOrderStatusSchema
};
