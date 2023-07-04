// src/components/ItemDetailDialog.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../redux/slices/item-slice';
import AddItemForm from './AddItemForm';

const ItemDetailDialog = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.itemSlice.edit);
  function handleEdit() {
    dispatch(getItem(item.name));
  }

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Description: {item.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Price: {item.price}</p>
        <p>Amount: {item.amount}</p>
        <p>{item.availability}</p>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={(e) => onClose(e)}>Close</button>
      </div>
      {edit && (
        <div id='edit-form-container'>
          <AddItemForm edit oldName={item.name} />
        </div>
      )}
    </div>
  );
};

export default ItemDetailDialog;
