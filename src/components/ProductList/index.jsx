import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ProductsList = ({ cart, setCart }) => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      );
      
  }

  if (error) {
    return <div>Səhv: {error}</div>;
  }

  const totalItems = data ? data.products.length : 0;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data.products.slice(indexOfFirstItem, indexOfLastItem) : [];


  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="py-8">
        <h4 className="text-center my-2 text-3xl text-bold text-blue-200 font-poppins">
          Product Cards
        </h4>
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-4">
          {currentItems &&
            currentItems.map((product) => (
              <Card
                key={product.id}
                product={product}
                cart={cart}       
                setCart={setCart} 
              />
            ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-md ${pageNumber === currentPage ? "bg-blue-600 text-white" : "bg-blue-300 text-white"} hover:bg-blue-400`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
