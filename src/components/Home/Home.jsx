import axios from "axios";
import { useEffect, useState, useContext } from "react";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext.jsx/CartContext";
import { WishListContext } from "../WishListContext/WishListContext";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { addToWishList } = useContext(WishListContext);

  async function getAllFood() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      console.log("Fetched products:", data); // Debugging log
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllFood();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto py-7 mt-12">
        <HomeSlider />
        <CategorySlider />
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#4fa74f" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
            {filteredProducts.map((product, index) => (
              <div key={index} className="product px-4 py-2 rounded relative group">
                <Link to={`/details/${product._id}`}>
                  <img src={product.imageCover} className="w-full" alt="" />
                  <h3 className="text-[#4fa74f] mb-2">{product.category.name}</h3>
                  <h3 className="h6 fw-bold">{product.title}</h3>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span>{product.price}</span>
                    <div className="d-flex align-items-center">
                      <i className="fa fa-star gold text-amber-300"></i>
                      <span>{product.ratingsAverage}</span>
                    </div>
                  </div>
                </Link>
                <div className="add-to-cart d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    + Add
                  </button>
                  <i
                    className="fa-2x fa-solid fa-heart h3 cursor-pointer"
                    onClick={() => addToWishList(product)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No products found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;