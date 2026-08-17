import useCartStore from "../../stores/cartStore";
import CartItem from "../../component/CartItem";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = useCartStore((state) => state.cartCount);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-2xl font-semibold inline-flex items-center gap-2">
          Your cart is empty <ShoppingCart />
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        {/* Cart Items */}
        <div className="rounded-xl border p-4">
          {cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="h-fit rounded-xl border p-6">
          <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

          <div className="mb-3 flex justify-between">
            <span>Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="mb-4 flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="my-4 border-t" />

          <div className="mb-6 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button className="w-full rounded-lg bg-black py-3 font-semibold text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
