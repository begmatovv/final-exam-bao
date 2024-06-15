import { Link, useLoaderData } from "react-router-dom";

import { editItem } from "../features/cart/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
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

  const addToCart = () => {
    // Assuming cartID is unique and generated elsewhere (e.g., UUID)
    dispatch(editItem({ cartID: data.id, amount: 1 }));
    // Optionally, you might want to show a confirmation or update UI to reflect addition
    console.log("Added to cart:", data.title);
  };

  return (
    <div>
      {data && (
        <div>
          <h1 className="text-2xl mb-4 font-semibold">Recept elements</h1>
          <img
            src={data.image}
            alt=""
            className="w-full h-80 object-cover rounded mb-5 "
          />
          <div>
            <h1 className="font-bold text-2xl mb-5">{data.title}</h1>
            <span className="font-bold">{data.type}</span>
          </div>
          <span className="flex gap-2 justify-start items-center mb-3">
            Ingredients:
            <span className="flex gap-2">
              {data.ingredients.map((ing, index) => (
                <span className="btn btn-primary-content" key={index}>
                  {ing}
                </span>
              ))}
            </span>
          </span>
          <p className="mb-3">
            Cooking time:
            <span className="p-1 bg-slate-200 rounded-lg">
              {" "}
              {data.cookingTime} minutes
            </span>
          </p>
          <div className="mb-3">
            <p className="text-xl font-medium mb-3">Method</p>
            <p>{data.method}</p>
          </div>
          <button
            onClick={addToCart}
            className="btn btn-secondary btn-md capitalize"
          >
            Add to Bag
          </button>
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
