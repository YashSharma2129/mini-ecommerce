import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(response.data.data || []); // Handle new response format
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleSearch = async (query, category) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/search`, {
        params: { query, category }
      });
      setProducts(response.data.data || []); // Handle new response format
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Search failed');
    }
  };

  const handleHeroSearch = (query) => {
    handleSearch(query, ''); // Call handleSearch with empty category
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="container mx-auto px-3 sm:px-4 py-4">
        <SearchBar onSearch={handleSearch} />
        <div className="mt-6 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {!products.length && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
