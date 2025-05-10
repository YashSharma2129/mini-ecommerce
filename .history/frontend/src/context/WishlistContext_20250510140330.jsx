import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  const fetchWishlist = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Fetch wishlist error:', error);
    }
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    try {
      if (!user) {
        toast.error('Please login to add to wishlist');
        return;
      }

      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/wishlist`, 
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchWishlist();
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  }, [user, fetchWishlist]);

  const removeFromWishlist = useCallback(async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchWishlist();
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
