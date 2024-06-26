import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyDiscount } from "../features/cart/cartSlice";

const CartTotal = () => {
  const { items, orderTotal, discount } = useSelector(
    (state) => state.cartState
  );
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");

  const cartTotal = items.reduce((total, item) => total + item.quantity, 0);

  const applyPromoCode = () => {
    if (promoCode === "BAO") {
      dispatch(applyDiscount(orderTotal % 10));
    } else {
      dispatch(applyDiscount(0));
    }
  };

  const discountedTotal = orderTotal - discount;

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <p className="flex justify-between flex-col items-center text-sm my-4 pb-2">
          <div>
            <span className="text-xl">Promocode:</span>
            <input
              type="text"
              value={promoCode}
              placeholder="BAO"
              onChange={(e) => setPromoCode(e.target.value)}
              className="outline-none bg-base-300 rounded-md p-3 w-full mb-4"
            />
             <button onClick={applyPromoCode} className="btn w-full btn-primary">
            Apply
          </button>
          </div>
         
        </p>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span className="text-xl">Total orders:</span>
          <span className="text-xl font-medium">{cartTotal}</span>
        </p>
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span className="text-xl">Order Total:</span>
          <span className="text-xl font-medium">{discountedTotal}.00$</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
