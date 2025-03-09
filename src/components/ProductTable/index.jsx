import React from "react";

const ProductTable = ({ cart, setCart }) => {
  const safeCart = cart || [];

  const updateQuantity = (id, amount) => {
    const updatedCart = safeCart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updatedCart); 
  };

  const removeProduct = (id) => {
    const updatedCart = safeCart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const totalAmount = safeCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-xl font-semibold text-center mb-4">Cart</h2>
      <table className="w-full border-collapse border border-gray-700 text-center">
        <thead>
          <tr className="bg-purple-200 text-black">
            <th className="p-2">Image</th>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {safeCart.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-2 text-center text-red-600">No products in cart.</td>
            </tr>
          ) : (
            safeCart.map((item) => (
              <tr key={item.id} className="bg-green-200 text-black">
                <td className="p-2">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    className="bg-blue-800 px-2 py-1 rounded hover:bg-blue-500 text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 mx-1 bg-white text-black rounded">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    className="bg-blue-800 px-2 py-1 rounded hover:bg-blue-500 text-white"
                  >
                    +
                  </button>
                </td>
                <td className="p-2">
                  <button 
                    onClick={() => removeProduct(item.id)} 
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 font-bold">Total: ${totalAmount.toFixed(2)}</div>
    </div>
  );
};

export default ProductTable;
