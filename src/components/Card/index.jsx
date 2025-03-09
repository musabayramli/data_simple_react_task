import React from "react";
import { toast } from "react-toastify"; 

const Card = ({ product, cart, setCart }) => {

  const addToCart = () => {
    const existingProduct = cart.find(item => item.id === product.id);

    let newCart;

    toast.dismiss();

    if (existingProduct) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      toast.info(`${product.brand} quantity increased!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,

      });
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`${product.brand} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }

    setCart(newCart);
  };

  const getButtonColor = (rating) => {
    if (rating >= 4) {
      return "bg-green-500 hover:bg-green-600";
    } else if (rating >= 3) {
      return "bg-orange-500 hover:bg-orange-600";
    } else {
      return "bg-red-500 hover:bg-red-600";
    }
  };

  return (
    <div className="bg-[#ddd6ff] shadow-lg rounded-2xl p-4 w-64 border border-gray-200">
      <h3 className="text-blue-600 font-semibold text-lg truncate">
        {product.name}
      </h3>
      <div className="flex justify-center my-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
      </div>
      <p className="text-gray-700 text-sm truncate">{product.description}</p>
      <p className="text-gray-900 font-bold mt-2">Price: {product.price} $</p>
      <p className="text-gray-700">Rating: {product.rating}</p>
      <p className="text-gray-700">Brand: {product.brand}</p>
      <button
        onClick={addToCart}
        className={`mt-4 text-white px-4 py-2 rounded-lg w-full font-semibold ${getButtonColor(product.rating)}`}
      >
        In Table
      </button>
    </div>
  );
};

export default Card;
