import React, { useState } from 'react';

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return;
  
    const res = await fetch('/api/prodotti', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location }),
    });
  
    const newProduct = await res.json();
    onAdd(newProduct);
    setName('');
    setLocation('');
  };
export default ProductForm;