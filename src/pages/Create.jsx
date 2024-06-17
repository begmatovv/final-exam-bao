import React, { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Create = () => {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [imageInput, setImageInput] = useState(""); 
  const [images, setImages] = useState([]); 

  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };
  const addImage = () => {
    if (imageInput.trim() !== "") {
      setImages([...images, imageInput.trim()]);
      setImageInput(""); 
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookingTime = formData.get("cookingTime");
    const method = formData.get("method");
    const category = formData.get("category");
    const price = formData.get("price");

    const newRecept = {
      title,
      cookingTime: Number(cookingTime),
      method,
      images,
      category,
      ingredients,
      price: Number(price),

      uid: user.uid,
    };

    addDoc(collection(db, "recepts"), newRecept)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding Recept: ", error);
      });
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-center text-5xl mb-10">Create New Recipe</h1>
      <Form onSubmit={handleSubmit} method="POST">
        <FormInput label="Title" type="text" name="title" />
        <div className="flex justify-center flex-col">
          <div className="flex items-center gap-5 w-full">
            <label className="form-control w-full mb-3">
              <span className="mb-3">Ingredient</span>
              <input
                onChange={(e) => setIngredient(e.target.value)}
                type="text"
                name="ingredients"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={ingredient}
              />
            </label>
            <button
              onClick={addIngredient}
              type="button"
              className="btn btn-secondary flex mt-7"
            >
              Add
            </button>
          </div>
          <p className="text-left mt-2 mb-3">
            Ingredients:{" "}
            {ingredients.map((ing, index) => (
              <span key={index}>{ing}, </span>
            ))}
          </p>
        </div>
        <label className="form-control w-full mb-3">
          <span>Category</span>
          <select
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="select select-bordered mt-3 w-full"
          >
            <option value="Uzbek traditional meals">
              Uzbek traditional meals
            </option>
            <option value="Turkish meals">Turkish meals</option>
            <option value="Japanese foods">Japanese foods</option>
            <option value="Fast Food">Fast foods</option>
            <option value="European kitchen">European kitchen</option>
          </select>
        </label>

        <div className="flex justify-center flex-col">
  <div className="flex items-center gap-5 w-full">
    <label className="form-control w-full mb-3">
      <span className="mb-3">Image URL</span>
      <input
        onChange={(e) => setImageInput(e.target.value)}
        type="url"
        placeholder="Type here"
        className="input input-bordered w-full"
        value={imageInput}
      />
    </label>
    <button
      onClick={addImage}
      type="button"
      className="btn btn-secondary flex mt-7"
    >
      Add
    </button>
  </div>
  <p className="text-left mt-2 mb-3">
    Images:{" "}
    {images.map((img, index) => (
      <span key={index}>{img}, </span>
    ))}
  </p>
</div>

        <FormInput label="Cooking Time" type="number" name="cookingTime" />
        <FormInput label="Method" type="text" name="method" />
        <FormInput label="Price" type="number" name="price" />
        <div className="flex gap-x-5">
          <button type="submit" className="btn btn-info w-1/2">
            Apply
          </button>
          <button type="button" className="btn btn-success w-1/2">
            Preview
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Create;
