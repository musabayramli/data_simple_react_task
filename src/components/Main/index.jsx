import React from "react";
import ProductsList from "../ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main({ cart, setCart }) {
  return (
    <div>
      <ProductsList cart={cart} setCart={setCart} />
      <ToastContainer />
    </div>
  );
}

export default Main;
