import React from "react";
import { useSelector } from "react-redux";
import { CartTotal } from "../components";

const Cart = () => {
  const { user } = useSelector((state) => state.userState);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemsInCart === 0) {
    return "Your cart is Empty";
  }
  return (
    <div className="py-10">
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">Cartitems</div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
