import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartItems, setcartItems] = useState([]);

  const onAdd = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const onMinus = () => {
    if (qty <= 1) return 1;
    setQty((prevQty) => prevQty - 1);
  };

  const onAddToCart = (product, quantity) => {
    const productInCart = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantity((prevQuantity) => prevQuantity + quantity);

    if (productInCart) {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          console.log("tgybuhdw");
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }
      });
      setcartItems(updatedCart);
    } else {
      setcartItems([...cartItems, { ...product, quantity: quantity }]);
    }
    toast.success(`${quantity} ${product.name} added to the cart`);
  };

  const onRemoveFromCart = ({ id, price, quantity }) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem._id !== id);
    setcartItems(updatedCart);
    setTotalPrice((prevPrice) => prevPrice - price * quantity);
    setTotalQuantity((prevQuantity) => prevQuantity - quantity);
  };

  const toogleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((cartItem) => cartItem._id === id);
    const updatedCart = cartItems.filter((cartItem) => cartItem._id !== id);
    if (value === "inc") {
      setcartItems([
        ...updatedCart,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalQuantity((prevQuantity) => prevQuantity + 1);
      setTotalPrice(
        (prevPrice) => prevPrice + foundProduct.price * foundProduct.quantity
      );
    } else if (value === "dec") {
      setcartItems([
        ...updatedCart,
        { ...foundProduct, quantity: foundProduct.quantity - 1 },
      ]);
      setTotalQuantity((prevQuantity) => prevQuantity - 1);
      setTotalPrice(
        (prevPrice) => prevPrice - foundProduct.price * foundProduct.quantity
      );
    }
  };
  return (
    <Context.Provider
      value={{
        totalPrice,
        totalQuantity,
        showCart,
        qty,
        onAdd,
        onMinus,
        onAddToCart,
        onRemoveFromCart,
        toogleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
