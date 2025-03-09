import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="bg-[#101727]">
      <Header cart={cart} setCart={setCart} />
      <Main cart={cart} setCart={setCart} />
      <ToastContainer />
    </div>
  );
}

export default App;
