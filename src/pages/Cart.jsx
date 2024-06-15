import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartState.items);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.cartID}>
              <p>
                {item.title} - Quantity: {item.amount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
