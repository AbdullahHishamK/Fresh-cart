import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../CartContext.jsx/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const userEmail = "user@example.com"; // Replace with actual user email

  const handleCheckout = () => {
    clearCart();
    navigate('/payment', { state: { userEmail, totalPrice } });
  };

  return (
    <div className="container mx-auto py-7 mt-32 bg-[#f8f9fa]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Cart Shop</h1>
        <div className="flex items-center">
          <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Checkout</button>
          <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      </div>
      {cart.length > 0 ? (
        <div>
          {cart.map((product, index) => (
            <div key={index} className="flex items-center justify-between mb-4 p-4 border-b-[#dee2e6] border-b-2 rounded">
              <img src={product.imageCover} className="w-24 h-24 object-cover" alt={product.title} />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-700">${product.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-end items-center mt-6">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={clearCart}>
              Clear Your Cart
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>No products in cart</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;