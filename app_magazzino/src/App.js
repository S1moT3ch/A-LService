import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  useEffect(() => {
    fetch('/api/prodotti')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1>Gestione Prodotti</h1>
      <ProductForm onAdd={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
};

export default App;