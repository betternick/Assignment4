import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAllItems,
  fetchItems,
  searchItems,
} from '../redux/slices/item-slice';
import ItemListItem from './ItemListItem';

const ItemList = () => {
  const items = useSelector((state) => state.itemSlice.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  function handleRemove() {
    if (window.confirm('Remove all items?')) dispatch(removeAllItems());
  }

  function handleSearch(e) {
    if (e.target.value) return dispatch(searchItems(e.target.value));
    dispatch(fetchItems());
  }

  return (
    <div>
      <input
        onChange={handleSearch}
        type='text'
        placeholder='search query'
        style={{ margin: '10px auto', display: 'block' }}
      />
      {items?.map((item) => (
        <ItemListItem key={item.name} item={item} />
      ))}
      {items.length ? (
        <center>
          <button onClick={handleRemove}>Remove All</button>{' '}
        </center>
      ) : (
        ''
      )}
    </div>
  );
};

export default ItemList;
