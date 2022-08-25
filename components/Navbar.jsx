import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

function Navbar() {
   const { showCart, setShowCart, totalQuantities } = useStateContext();
   
   return (
      <div className="navbar-container">
         <p className="logo">
            <Link href="/">Ayush's Productions</Link>
         </p>
         <button type="button" className="cart-icon" onClick={(e) => setShowCart(true)}>
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
         </button>
         {showCart && <Cart />}
      </div>
   );
}

export default Navbar;