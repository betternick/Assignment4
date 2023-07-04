import React, { useState } from 'react';
import ItemDetailDialog from './ItemDetailDialog';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/slices/item-slice';

const ItemListItem = ({ item }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleItemClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (e) => {
    e.stopPropagation();
    setIsDialogOpen(false);
  };

  function handleDelete(e) {
    e.stopPropagation();
    dispatch(removeItem(item.name));
  }

  return (
    <div className='list-item' onClick={handleItemClick}>
      <button onClick={handleDelete}>x</button>
      <img src={item.image} alt={item.name} />
      {isDialogOpen ? (
        <ItemDetailDialog item={item} onClose={handleCloseDialog} />
      ) : (
        <div>
          <h2>{item.name}</h2>
        </div>
      )}
    </div>
  );
};

export default ItemListItem;
