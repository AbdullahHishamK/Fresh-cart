import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  const addToWishList = (item) => {
    setWishList((prevItems) => {
      // Prevent duplicates
      if (prevItems.some((i) => i._id === item._id)) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFromWishList = (id) => {
    setWishList((prevItems) => prevItems.filter(item => item._id !== id));
  };

  return (
    <WishListContext.Provider value={{ wishList, addToWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

WishListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
