import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subCategoryNames, setSubCategoryNames] = useState([]);
  const [error, setError] = useState(null);
  const [chosenCategoryName, setChosenCategoryName] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        setLoadingCategories(false);
      } catch (error) {
        console.log('Error fetching categories:', error);
        setError('Error fetching categories');
        setLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    const chosenCategory = categories.find(category => category._id === categoryId);
    setChosenCategoryName(chosenCategory ? chosenCategory.name : '');
    setLoadingSubCategories(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`);
      setSubCategories(data.data);
      setSubCategoryNames(data.data.map(subCategory => subCategory.name));
      console.log('Subcategory names:', data.data.map(subCategory => subCategory.name)); // Debugging line
      setLoadingSubCategories(false);
    } catch (error) {
      console.log('Error fetching subcategories:', error);
      setError('Error fetching subcategories');
      setLoadingSubCategories(false);
    }
  };

  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/products?subcategory=${subCategoryId}`);
  };

  return (
    <div className="container mx-auto py-7 mt-36">
      {error && <p className="text-red-500">{error}</p>}
      {loadingCategories ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#4fa74f" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-20">
          {categories.map((category) => (
            <div
              key={category._id}
              className="category relative group border border-gray-300 hover:shadow-lg hover:shadow-[#4fa74f] transition-shadow duration-300 rounded-2xl"
              onClick={() => handleCategoryClick(category._id)}
            >
              <img src={category.image} className="w-full h-86 object-cover rounded-2xl" alt={category.name} />
              <h3 className="text-center text-2xl font-bold mt-4 mb-4 text-[#4fa74f]">{category.name}</h3>
            </div>
          ))}
        </div>
      )}
      {subCategoryNames.length > 0 && (
        <div className="mt-10 text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#4fa74f]">{chosenCategoryName}</h2>
          {loadingSubCategories ? (
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color="#4fa74f" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-x-6 gap-y-20">
              {subCategories.map((subCategory) => (
                <div
                  key={subCategory._id}
                  className="subcategory px-4 py-2 rounded relative group border border-gray-300 hover:shadow-lg hover:shadow-[#4fa74f] transition-shadow duration-300"
                  onClick={() => handleSubCategoryClick(subCategory._id)}
                >
                  <h3 className="text-center text-2xl font-bold mt-4">{subCategory.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;