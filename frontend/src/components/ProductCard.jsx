import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleQuickView = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      await addToCart(product, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      onClick={handleQuickView}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={!imageError ? product.imageUrl : 'https://via.placeholder.com/400'}
          alt={product.name}
          onError={() => setImageError(true)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 bg-black/40 backdrop-blur-sm transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-4/5 py-1.5 sm:py-2 bg-primary text-white rounded-full font-medium transform hover:scale-105 transition-all text-xs sm:text-sm disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
          <button 
            onClick={handleQuickView}
            className="w-4/5 py-1.5 sm:py-2 bg-white text-gray-900 rounded-full font-medium transform hover:scale-105 transition-all text-xs sm:text-sm"
          >
            View Details
          </button>
        </div>
      </div>

      <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="mt-2 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
