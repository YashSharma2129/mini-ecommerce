import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleQuickView = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div 
      onClick={handleQuickView}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/400'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-sm transition-opacity ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
            }}
            className="w-4/5 py-2 bg-primary text-white rounded-full font-medium transform hover:scale-105 transition-all text-sm sm:text-base"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleQuickView}
            className="w-4/5 py-2 bg-white text-gray-900 rounded-full font-medium transform hover:scale-105 transition-all text-sm sm:text-base"
          >
            View Details
          </button>
        </div>

        {/* Category Badge */}
        <span className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
          {product.category}
        </span>

        {/* Price Badge */}
        <div className="absolute bottom-2 right-2 px-3 py-1 bg-primary text-white rounded-full text-sm font-bold shadow-lg">
          ${Number(product.price).toFixed(2)}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors">
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

      {/* Add Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
      >
        <svg className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} 
          stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCard;
