import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  itemsFavourite: [],
  itemsDisFavourite: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "ADDCart") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    let updatedTotalAmount;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      updatedTotalAmount = action.item.price * action.item.amount;
    } else {
      updatedItems = state.items.concat(action.item);
      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // if (action.type === 'ADDFavourite') {
  //   const existingFavouriteIndex = state.itemsFavourite.findIndex(item => item.id === action.item.id);
  //   const existingFavouriteItem = state.itemsFavourite[existingFavouriteIndex];
  //   let updatedFavourites;

  //   if (existingFavouriteItem) {
  //     updatedFavourites = [...state.itemsFavourite]; // No change if already in favourites
  //   } else {
  //     updatedFavourites = state.itemsFavourite.concat(action.item);
  //   }

  //   return {
  //     ...state,
  //     itemsFavourite: updatedFavourites,
  //   };
  // }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVEAll") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    if (!existingItem) {
      // If item is not found, just return the current state without changes
      return state;
    }

    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.amount;

    // Filter out the item from the cart
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    console.log(updatedItems);

    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "TOGGLE_FAVOURITE") {
    const existingFavouriteIndex = state.itemsFavourite.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedFavourites;
    let updatedDisFavourites = state.itemsDisFavourite.filter(
      (item) => item.id !== action.item.id
    );

    if (existingFavouriteIndex >= 0) {
      // If it exists in favourites, remove it
      updatedFavourites = state.itemsFavourite.filter(
        (item) => item.id !== action.item.id
      );
    } else {
      // If it doesn't exist, add it to favourites
      updatedFavourites = [...state.itemsFavourite, action.item];
    }

    return {
      ...state,
      itemsFavourite: updatedFavourites,
      itemsDisFavourite: updatedDisFavourites,
    };
  }

  if (action.type === "TOGGLE_DisFAVOURITE") {
    const existingDisFavouriteIndex = state.itemsDisFavourite.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedDisFavourites;
    let updatedFavourites = state.itemsFavourite.filter(
      (item) => item.id !== action.item.id
    );

    if (existingDisFavouriteIndex >= 0) {
      // If it exists in disfavourites, remove it
      updatedDisFavourites = state.itemsDisFavourite.filter(
        (item) => item.id !== action.item.id
      );
    } else {
      // If it doesn't exist, add it to disfavourites
      updatedDisFavourites = [...state.itemsDisFavourite, action.item];
    }

    return {
      ...state,
      itemsDisFavourite: updatedDisFavourites,
      itemsFavourite: updatedFavourites,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler1 = (item) => {
    dispatchCartAction({ type: "ADDCart", item: item });
  };
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const addItemToFavouriteHandler = (item) => {
    dispatchCartAction({ type: "TOGGLE_FAVOURITE", item: item });
  };
  const addItemToDisFavouriteHandler = (item) => {
    dispatchCartAction({ type: "TOGGLE_DisFAVOURITE", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const removeItemAll = (id) => {
    dispatchCartAction({ type: "REMOVEAll", id: id });
  };
  // const removeItemFromFavouriteHandler = (id) => {
  //   dispatchCartAction({ type: 'REMOVEFAVOURITE', id });
  // };
  const cartContext = {
    items: cartState.items,
    itemsFavourite: cartState.itemsFavourite,
    itemsDisFavourite: cartState.itemsDisFavourite,
    totalAmount: cartState.totalAmount,
    removeItemall: removeItemAll,
    addItem1: addItemToCartHandler1,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    addItemToFavourite: addItemToFavouriteHandler,
    addItemToDisFavourite: addItemToDisFavouriteHandler,
    // removeItemFavourite:removeItemFromFavouriteHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
