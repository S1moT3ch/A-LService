import React from 'react';

const ProductList = ({ products }) => (
  <ul>
    {products.map((product, index) => (
      <li key={index}>
        {product.name} - {product.location}
      </li>
    ))}
  </ul>
);

export default ProductList;