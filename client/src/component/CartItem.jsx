import cartStore from "../stores/cartStore";

const CartItem = ({ item }) => {
  const increaseQuantity = cartStore((state) => state.increaseQuantity);

  const decreaseQuantity = cartStore((state) => state.decreaseQuantity);

  return (
    <div className="flex items-center gap-4 border-b py-4">
      {/* Image */}
      <img
        src={item.image.url}
        alt={item.name}
        className="h-24 w-24 rounded-lg object-cover"
      />

      {/* Food Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="text-gray-500">₹{item.price}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => decreaseQuantity(item._id)}
          className="h-8 w-8 rounded bg-gray-200 text-lg"
        >
          −
        </button>

        <span className="w-6 text-center">{item.quantity}</span>

        <button
          onClick={() => increaseQuantity(item._id)}
          className="h-8 w-8 rounded bg-gray-200 text-lg"
        >
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="w-24 text-right font-semibold">
        ₹{item.price * item.quantity}
      </div>
    </div>
  );
};

export default CartItem;
