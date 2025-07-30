import { useContext } from 'react';
import { WishListContext } from '../WishListContext/WishListContext';
import { Link } from 'react-router-dom';

const WishList = () => {
  const { wishList, removeFromWishList } = useContext(WishListContext);

  return (
    <div className="container mx-auto py-7 mt-36">
      <h2 className="text-4xl font-bold mb-8 text-[#4fa74f]">Wish List</h2>
      {wishList && wishList.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-20">
          {wishList.map((item, index) => (
            <div key={index} className="product px-4 py-2 rounded relative group border border-gray-300 hover:shadow-lg hover:shadow-[#4fa74f] transition-shadow duration-300">
              <Link to={`/details/${item._id}`}>
                <img src={item.imageCover} className="w-full" alt={item.title} />
                <h3 className="text-[#4fa74f] mb-2">{item.category.name}</h3>
                <h3 className="h6 fw-bold">{item.title}</h3>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span>{item.price}</span>
                  <div className="d-flex align-items-center">
                    <i className="fa fa-star gold text-amber-300"></i>
                    <span>{item.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <div className="remove-from-wishlist d-flex justify-content-between align-items-center mt-2">
                <button
                  className="remove-from-wishlist-button bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => removeFromWishList(item._id)}
                >
                  Remove
                </button>
                <i className="fa-2x fa-solid fa-heart h3 text-red-500"></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>No items in the wish list</h1>
        </div>
      )}
    </div>
  );
};

export default WishList;
