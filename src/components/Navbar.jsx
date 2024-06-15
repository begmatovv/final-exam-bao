import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import fetchWeather from "../utils";
const themes = {
  winter: "winter",
  dracula: "dracula",
};
function LocalStorageTheme() {
  return localStorage.getItem("mode") || themes.winter;
}
const Navbar = () => {
  const [weather, setWeather] = useState(null); // State to hold weather data
  const [error, setError] = useState(null); // State to hold error message

  useEffect(() => {
    // Fetch weather based on user's location
    const fetchWeatherData = async () => {
      try {
        // Get user's location using Geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch weather data using coordinates
          const weatherData = await fetchWeather(latitude, longitude);
          setWeather(weatherData);
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        setError("Failed to fetch location. Please allow location access.");
      }
    };

    fetchWeatherData();
  }, []);
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
        <div>
          {weather && (
            <div className="weather-info">
              <h2>Current Weather</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
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
