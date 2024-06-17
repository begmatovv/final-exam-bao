
import React from "react";
import { useSelector } from "react-redux";
import { CartTotal } from "../components";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartState.items);

  if (cartItems.length === 0) {
    return "Your cart is Empty";
  }

  return (
    <div className="py-10">
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
        <ul className="pt-5 md:col-span-1 lg:col-span-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
        <div className="lg:col-span-6 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;