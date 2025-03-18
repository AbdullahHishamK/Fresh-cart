import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { useAuth } from '../auth/AuthContext';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext.jsx/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='p-5 bg-gray-100 fixed top-0 w-full z-50'>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img src={logo} alt="FreshCart Logo" className='w-[120px]' />
          <button
            className="text-gray-700 md:hidden"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className='flex flex-col md:flex-row md:items-center md:justify-center w-full'>
            {isAuthenticated && (
              <>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/home' className='p-2'>Home</NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0 relative'>
                  <NavLink to='/cart' className='p-2'>
                    Cart
                    {cart.length > 0 && (
                      <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/products' className='p-2'>Products</NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/category' className='p-2'>Categories</NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/brand' className='p-2'>Brands</NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/wishlist' className='p-2'>Wishlist</NavLink>
                </li>
              </>
            )}
          </ul>
          <div className='flex flex-col md:flex-row md:items-center md:justify-center w-full'>
            <div className='flex space-x-2 justify-center'>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
            <ul className='flex flex-col md:flex-row md:items-center md:justify-center w-full'>
              {isAuthenticated ? (
                <li className='mx-2 my-2 md:my-0'>
                  <button onClick={logout} className='p-2'>Logout</button>
                </li>
              ) : (
                <>
                  <li className='mx-2 my-2 md:my-0'>
                    <NavLink to='/login' className='p-2'>Login</NavLink>
                  </li>
                  <li className='mx-2 my-2 md:my-0'>
                    <NavLink to='/register' className='p-2'>Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
