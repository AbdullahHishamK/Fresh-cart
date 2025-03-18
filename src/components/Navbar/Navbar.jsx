import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { useAuth } from '../auth/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
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
          <ul className='flex flex-col md:flex-row md:items-center'>
            {isAuthenticated && (
              <>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/home' className='p-2'>Home</NavLink>
                </li>
                <li className='mx-2 my-2 md:my-0'>
                  <NavLink to='/cart' className='p-2'>Cart</NavLink>
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
          <div className='flex flex-col md:flex-row md:items-center'>
            <i className="fa-brands fa-instagram ml-2"></i>
            <i className="fa-brands fa-facebook ml-2"></i>
            <i className="fa-brands fa-tiktok ml-2"></i>
            <i className="fa-brands fa-twitter ml-2"></i>
            <i className="fa-brands fa-linkedin ml-2"></i>
            <i className="fa-brands fa-youtube ml-2"></i>
            <ul className='flex flex-col md:flex-row md:items-center'>
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
