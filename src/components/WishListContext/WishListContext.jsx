import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState([]);

  const addToWishList = (item) => {
    setWishListItems((prevItems) => [...prevItems, item]);
  };
  
  WishListProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const removeFromWishList = (id) => {
    setWishListItems((prevItems) => prevItems.filter(item => item._id !== id));
  };

  return (
    <WishListContext.Provider value={{ wishListItems, addToWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

WishListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};