import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  // Using a lightweight SVG as placeholder
  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9ca3af" text-anchor="middle">
        No Image Available
      </text>
    </svg>
  `)}`;

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error loading product');
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = placeholderImage;
    e.target.onerror = null; // Prevent infinite loop
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img 
            src={!imageError ? (product?.imageUrl || placeholderImage) : placeholderImage}
            alt={product?.name}
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product?.name || 'Loading...'}
            </h1>
            <p className="text-lg text-primary mt-2">
              ${(product?.price || 0).toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            {product?.description || 'No description available'}
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >-</button>
              <span className="text-lg font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >+</button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              Add to Cart - ${((product?.price || 0) * quantity).toFixed(2)}
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-600 dark:text-gray-400">Category</div>
              <div className="text-gray-900 dark:text-white capitalize">{product.category}</div>
              <div className="text-gray-600 dark:text-gray-400">Rating</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
