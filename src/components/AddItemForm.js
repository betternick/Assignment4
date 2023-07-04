import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setEdit, updateItem } from '../redux/slices/item-slice';

const AddItemForm = ({ edit, oldName }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.itemSlice.formData);
  const [name, setName] = useState(edit && (formData?.name || ''));
  const [description, setDescription] = useState(
    edit && (formData?.description || '')
  );
  const [price, setPrice] = useState(edit && (formData?.price || ''));
  const [image, setImage] = useState(edit && (formData?.image || ''));
  const [availability, setAvailability] = useState(
    edit && (formData?.availability || '')
  );
  const [amount, setAmount] = useState(edit && (formData?.amount || 0));
  const handleAddItem = () => {
    if (!name) return window.alert('Please insert a name');
    if (!image) return window.alert('Please insert an image url');
    const newItem = {
      name,
      description,
      price,
      image,
      availability,
      amount,
    };
    if (edit) return dispatch(updateItem({ name: oldName, item: newItem }));
    dispatch(addItem(newItem));
  };

  const handleClearForm = () => {
    if (edit) return dispatch(setEdit(false));
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setAvailability('');
    setAmount('');
  };

  return (
    <div onClick={(e) => e.stopPropagation()} id='form'>
      <input
        type='text'
        placeholder='Item Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='number'
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select onChange={(e) => setAvailability(e.target.value)}>
        <option value='available'>Available</option>
        <option value='unavailable'>Not available</option>
      </select>
      <input
        type='text'
        placeholder='Image URL'
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div>
        <button onClick={handleAddItem}>{edit ? 'Update' : 'Add Item'}</button>
        <button onClick={handleClearForm}>{edit ? 'Close' : 'Clear'}</button>
      </div>
    </div>
  );
};

export default AddItemForm;
