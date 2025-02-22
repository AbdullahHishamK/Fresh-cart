import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/register/Register';
import Cart from './components/Cart/Cart';
import Category from './components/category/Category';
import Login from './components/login/Login';
import Brand from './components/Brand/Brand';
import Error from './components/Error/Error';
import Layout from './components/Layout/Layout';
import Products from './components/products/Products';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Details from './components/Details/Details';
import { CartProvider } from './components/CartContext.jsx/CartContext';
import WishList from './components/wishList/WishList';
import { WishListProvider } from './components/WishListContext/WishListContext';
import { AuthProvider } from './components/auth/AuthContext';
import Payment from './components/Payment/Payment';


const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
        { path: '/register', element: <Register /> },
        { path: '/cart', element: <Cart /> },
        { path: '/category', element: <Category /> },
        { path: '/login', element: <Login /> },
        { path: '/brand', element: <Brand /> },
        { path: '*', element: <Error /> },
        { path: '/products', element: <Products /> },
        { path: '/details/:id', element: <Details /> },
        { path: '/wishlist', element: <WishList /> },
        { path: '/payment', element: <Payment /> },
        
      ],
    },
  ]);

  return (
<QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <CartProvider>
          <WishListProvider>
            <RouterProvider router={router} />
          </WishListProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;