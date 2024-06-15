import React, { useState } from "react";
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
  console.log(user.uid);
  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient(""); // Clear input field after adding ingredient
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const cookingTime = formData.get("cookingTime");
    const method = formData.get("method");
    const image = formData.get("image");
    const type = formData.get("type");

    const newRecept = {
      title,
      cookingTime: Number(cookingTime), // Convert to number if needed
      method,
      image,
      type,
      ingredients,
      uid: user.uid,
    };

    addDoc(collection(db, "recepts"), newRecept)
      .then(() => {
        navigate("/");
        // Optionally, you can add a toast message or redirect to another page upon success
      })
      .catch((error) => {
        console.error("Error adding Recept: ", error);
        // Handle error - show toast or alert
      });
  };

  return (
    <div className="align-element">
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
              type="button" // Change to type="button" since it's not submitting the form
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
        <FormInput label="Meal type" type="text" name="type" />
        <FormInput label="Photo URL" type="url" name="image" />
        <FormInput label="Cooking Time" type="number" name="cookingTime" />
        <FormInput label="Method" type="text" name="method" />
        <div className="btns flex gap-x-5">
          <button className="btn btn-info w-1/2">Apply</button>
          <button className="btn btn-success w-1/2">Preview</button>
        </div>
      </Form>
    </div>
  );
};

export default Create;
