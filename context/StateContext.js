import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const StateContext = createContext();

function StateContextProvider({ children }) {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);
   
   let foundProduct;
   let index;
   
   // Cart Item Increase/Decrease Functionality
   const incQty = () => setQty((prevQty) => prevQty + 1);
   const decQty = () => {
      setQty((prevQty) => {
         if ((prevQty - 1) < 1) return 1;
         return prevQty - 1;
      });
   };
   
   // Add Item to Cart functionality
   const onAdd = (product, quantity) => {
      const isProductInCart = cartItems.find((cartItem) => cartItem._id === product._id);
      setTotalPrice((prevPrice) => prevPrice + (product.price * quantity));
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
      
      if (isProductInCart) {
         const updatedCartItems = cartItems.map((cartItem) => {
            if (cartItem._id === product._id) {
               return { ...cartItem, quantity: cartItem.quantity + quantity };
            }
         });
         setCartItems(updatedCartItems);
      } else {
         product.quantity = quantity;
         setCartItems([...cartItems, { ...product }]);
      }
      toast.success(`${qty} ${product.name} added to your cart.`);
   };
   
   const onRemove = (product) => {
      foundProduct = cartItems.find((cartItem) => cartItem._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.price * foundProduct.quantity));
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
      setCartItems(newCartItems);
   };
   
   const toggleCartItemQuantity = (id, value) => {
      foundProduct = cartItems.find((cartItem) => cartItem._id === id);
      index = cartItems.findIndex((cartItem) => cartItem._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id);
      
      switch (value) {
         case 'inc':
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
            break;
         case 'dec':
            if (foundProduct.quantity > 1) {
               setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
               setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
               setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
            }
            break;
         default:
            break;
      }
   };
   
   // Overall Context State
   const data = {
      showCart, setShowCart,
      cartItems, setCartItems,
      totalPrice, setTotalPrice,
      totalQuantities, setTotalQuantities,
      qty, incQty, decQty,
      onAdd, onRemove,
      toggleCartItemQuantity,
   };
   
   return (
      <StateContext.Provider value={data}>
         { children }
      </StateContext.Provider>
   );
}

export default StateContextProvider;

export function useStateContext() {
   return useContext(StateContext);
}