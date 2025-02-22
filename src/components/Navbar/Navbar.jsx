import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className='p-5 bg-gray-100 text-center fixed top-0 w-full z-50'>
      <div className="container mx-auto p-2 flex flex-wrap flex-col items-center md:flex-row justify-between">
        <div className="flex flex-wrap flex-col items-center md:flex-row justify-between">
          <div className='flex flex-wrap flex-col items-center md:flex-row justify-between'>
            <img src={logo} alt="" className='w-[120px] text-center m-auto'/>
            <ul className='flex flex-wrap flex-col items-center md:flex-row justify-between'>
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
          </div>
        </div>

        <div className='flex flex-wrap flex-col items-center md:flex-row justify-between'>
          <i className="fa-brands fa-instagram ml-2"></i>
          <i className="fa-brands fa-facebook ml-2"></i>
          <i className="fa-brands fa-tiktok ml-2"></i>
          <i className="fa-brands fa-twitter ml-2"></i>
          <i className="fa-brands fa-linkedin ml-2"></i>
          <i className="fa-brands fa-youtube ml-2"></i>
          <ul className='flex flex-wrap flex-col items-center md:flex-row justify-between'>
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
    </nav>
  );
}

export default Navbar;