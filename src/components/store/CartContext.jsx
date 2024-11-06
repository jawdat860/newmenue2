import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  itemsFavourite: [],
  itemsDisFavourite: [],
  addItem: (item) => {},
  addItem1: (item) => {},
  addItemToFavourite: (item) => {},
  addItemToDisFavourite: (item) => {},
  removeItem: (id) => {},
  removeItemall: (id) => {},
  removeItemFavourite: (id) => {},
  clear: () => {},
});

export default CartContext;
