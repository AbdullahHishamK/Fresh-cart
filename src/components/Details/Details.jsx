import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from '../CartContext.jsx/CartContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        console.log(`Fetching product details for ID: ${id}`);
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        console.log("Fetched product details:", data);
        setProduct(data.data);
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("🛒 Item added to cart!");
  };

  const handleAddToWishlist = () => {
    toast.info("💖 Item added to wishlist!");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-7">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.imageCover} className="w-full" alt={product.title} />
        </div>
        <div className="md:w-1/2 md:pl-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <i className="fa fa-star gold text-amber-300"></i>
            <span className="ml-2">{product.ratingsAverage}</span>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-[80%]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <i
              className="fa-2x fa-solid fa-heart h3 cursor-pointer text-red-500"
              onClick={handleAddToWishlist}
            ></i>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Details;
