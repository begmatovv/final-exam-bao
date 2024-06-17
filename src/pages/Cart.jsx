import React from "react";
import { useSelector } from "react-redux";
import { CartTotal } from "../components";
import CartItem from "../components/CartItem";
import video from "../video/vid.mp4";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartState.items);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <p className="text-3xl">Your cart is Empty...</p>
        <video
          src={video}
          autoPlay
          loop
          muted
          className="bg-white h-screen w-full"
        />
      </div>
    );
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
