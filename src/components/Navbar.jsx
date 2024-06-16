import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import fetchWeather from "../utils";
import Weather from "./Weather";
const themes = {
  winter: "winter",
  dracula: "dracula",
};
function LocalStorageTheme() {
  return localStorage.getItem("mode") || themes.winter;
}
const Navbar = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const { user } = useSelector((state) => state.userState);
  const [theme, setTheme] = useState(LocalStorageTheme());
  function handleClick() {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
    toast.success("Mode changed successfully");
  }
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mode", theme);
  }, [theme]);

  return (
    <div className="bg-base-300">
      <div className="navbar align-element mb-10">
        <div className="navbar-start">
          <Link className=" btn btn-primary hidden lg:flex" to="/">
            Kitchen app
          </Link>
          <Link className="btn btn-primary flex lg:hidden">MK</Link>
          
        </div>
        <Weather />
        <div className="navbar-end">
          <Link to="/cart" className="indicator mr-3">
            <AiOutlineShoppingCart className="w-6 h-6 " />
            <span className="badge badge-sm badge-primary indicator-item">
              {numItemsInCart}
            </span>
          </Link>
          {user && <p className="mr-3">{user.displayName}</p>}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={`${user.displayName} image`} src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chart">Chart</Link>
              </li>
              <li>
                <Link to="/create">Create a recept</Link>
              </li>
              <li>
                <button onClick={handleClick}>Change theme</button>
              </li>
              <li>
                <button onClick={() => signOut(auth)} className="btn btn-sm ">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
