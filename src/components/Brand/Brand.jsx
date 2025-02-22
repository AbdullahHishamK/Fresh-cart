import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(response => {
        setBrands(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the brands:', error);
        setLoading(false);
      });
  }, []);

  const handleBrandClick = (brand) => {
    Swal.fire({
      title: brand.name,
      imageUrl: brand.image,
      imageAlt: brand.name,
      confirmButtonText: 'Close',
      position: 'top'
    });
  };

  return (
    <div className="container mx-auto py-8 mt-32">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#4fa74f" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map(brand => (
            <div
              key={brand._id}
              className="brand-item border border-gray-300 p-4 text-center cursor-pointer hover:shadow-lg hover:shadow-[#4fa74f] transition-shadow duration-300"
              onClick={() => handleBrandClick(brand)}
            >
              <img src={brand.image} alt={brand.name} className="mx-auto mb-4" />
              <p className="text-gray-700">{brand.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brand;