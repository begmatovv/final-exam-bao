import { Link, useLoaderData } from "react-router-dom";

import { addItem } from "../features/cart/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
export const loader = async ({ params }) => {
  const docRef = doc(db, "recepts", params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
  return null;
};
const SingleRecept = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const [itemNum, setItemNum] = useState(1);
  const plusFunc = () => {
    setItemNum(itemNum + 1);
  };
  const minusFunc = () => {
    if (itemNum > 1) {
      setItemNum(itemNum - 1);
    }
  };
  const addToCartHandler = () => {
    const cartProduct = {
      id: crypto.randomUUID(),
      quantity: itemNum,
      title: data.title,
      image: data.images[0],
      cookingTime: data.cookingTime,
      price: data.price,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartProduct];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(addItem(cartProduct));
    toast.success("Added to cart successfully");
  };
  return (
    <div>
      {data && (
        <div>
          <h1 className="text-2xl mb-4 font-semibold">Recept elements</h1>
          <div className="carousel carousel-center w-full  p-4 space-x-4 bg-neutral rounded-box">
            {data.images.map((img, index) => {
              return (
                <div key={index} className="carousel-item">
                  <img src={img} className="rounded-box w-[400px] h-[400px]" />
                </div>
              );
            })}
          </div>
          <div className="text-center font-bold text-2xl mb-2">
            {data.category}
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-5">{data.title}</h1>
            <span className="font-bold">{data.type}</span>
          </div>
          <span className="flex gap-2 justify-start items-center mb-6 ">
            Ingredients:
            <span className="flex gap-2 overflow-x-auto">
              {data.ingredients.map((ing, index) => (
                <span className="btn btn-primary-content" key={index}>
                  {ing}
                </span>
              ))}
            </span>
          </span>
          <p className="mb-6">
            Cooking time:
            <span className="p-1 bg-slate-200 rounded-lg">
              {" "}
              {data.cookingTime} minutes
            </span>
          </p>
          <div className="mb-6">
            <p className="text-xl font-medium mb-3">Method</p>
            <p>{data.method}</p>
          </div>
          <div className="text-xl mb-6">
            Price: <span className="text-green-500">{data.price}.00$</span>
          </div>
          <div className="mb-5 text-center flex lg:flex-row md:flex-row sm:flex-row flex-col gap-10">
            <div className="flex  items-center gap-5">
              <button className="btn  text-2xl" onClick={minusFunc}>
                -
              </button>
              <span className=" btn text-lg font-semibold">{itemNum}</span>
              <button className="btn  text-2xl" onClick={plusFunc}>
                +
              </button>
            </div>
            <div>
              <button
                onClick={addToCartHandler}
                className="btn btn-primary w-full text-white text-lg "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-right">
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SingleRecept;
