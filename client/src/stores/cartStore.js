import { create } from "zustand";

const cartStore = create((set) => ({
  cart: [],
  cartCount: 0,
  AddItemToCart: (food) => {
    console.log(food);
    set((state) => {
      let existingItem = state.cart.find((item) => item._id === food._id);
      if (existingItem) {
        console.log(state);
        return {
          cartCount: state.cartCount + 1,
          cart: state.cart.map((item) => {
            return item._id === food._id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        };
      }
      console.log(state);
      return {
        cartCount: state.cartCount + 1,
        cart: [
          ...state.cart,
          {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1,
          },
        ],
      };
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),

      cartCount: state.cartCount + 1,
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const item = state.cart.find((item) => item._id === id);

      if (!item) return state;

      // Don't allow quantity below 1
      if (item.quantity === 1) {
        return state;
      }

      return {
        cart: state.cart.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),

        cartCount: state.cartCount - 1,
      };
    });
  },
}));

export default cartStore;
