// src/App.js
// This project was made using ChatGPT4.0 as my AI coding assistant.

import React from 'react';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import './styles.css'; // Import the styles.css file

const App = () => {
  return (
    <div className='container'>
      <h1>Inventory Website 2.0</h1>
      <AddItemForm />
      <ItemList />
    </div>
  );
};

export default App;
