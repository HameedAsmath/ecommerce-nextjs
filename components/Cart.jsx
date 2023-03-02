import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import toast from "react-hot-toast";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";

const Cart = () => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantity,
    setShowCart,
    onRemoveFromCart,
    toogleCartItemQuantity,
  } = useStateContext();
  const handleCheckout = () => {
    
  }
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantity} items</span>
        </button>

        {cartItems.length === 0 && (
          <div className="empty-cart">
            <AiOutlineShopping size={100} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((cartItem) => (
              <div className="product" key={cartItem._id}>
                <img
                  src={urlFor(cartItem?.image[0])}
                  className="cart-product-image"
                ></img>

                <div className="item-desc">
                  <div className="flex top">
                    <h5>{cartItem.name}</h5>
                    <h4>Rs: {cartItem.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => toogleCartItemQuantity(cartItem._id,"dec")}>
                          <AiOutlineMinus />
                        </span>

                        <span className="num" >
                          {cartItem.quantity}
                        </span>

                        <span className="plus" onClick={() => toogleCartItemQuantity(cartItem._id, "inc")}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type="button" className="remove-item"
                    onClick={()=> onRemoveFromCart(cartItem)}
                    >
                      <TiDeleteOutline/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="card-bottom">
              <div className="total">
                  <h3>Subtotal:</h3>
                  <h3>Rs: {totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>Pay with Stripe</button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
