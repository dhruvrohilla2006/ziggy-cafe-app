const createOrderObject = (data, reqObj) => {
  return data.map((item) => {
    const cartItem = reqObj.find((cart) => cart.itemId === item._id.toString());

    if (!cartItem) {
      throw new Error(`Cart item not found: ${item._id}`);
    }

    return {
      itemId: item._id,
      name: item.name,
      price: item.price,
      quantity: cartItem.quantity,
      subtotal: item.price * cartItem.quantity,
    };
  });
};

module.exports = {
  createOrderObject,
};
