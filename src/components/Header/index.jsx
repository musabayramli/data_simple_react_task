import React from 'react';
import ProductTable from '../ProductTable';

function Header({ cart, setCart }) {
  return (
    <div>
      <ProductTable cart={cart} setCart={setCart} />
    </div>
  );
}

export default Header;
