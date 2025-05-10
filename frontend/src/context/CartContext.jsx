import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = useCallback((product, quantity = 1) => {
    try {
      if (!product?._id) {
        throw new Error('Invalid product');
      }
      
      setCartItems(prev => {
        const existing = prev.find(item => item._id === product._id);
        if (existing) {
          const newQuantity = existing.quantity + quantity;
          toast.success(
            <div className="flex items-center gap-2">
              <span>Updated quantity to {newQuantity}</span>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-primary hover:underline"
              >
                View Cart
              </button>
            </div>
          );
          return prev.map(item =>
            item._id === product._id 
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
        
        toast.success(
          <div className="flex items-center gap-2">
            <span>Added to cart!</span>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:underline"
            >
              View Cart
            </button>
          </div>
        );
        return [...prev, { ...product, quantity }];
      });
      setIsCartOpen(true);
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Add to cart error:', error);
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
    toast.success('Removed from cart');
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item._id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setIsCartOpen(false);
    localStorage.removeItem('cart');
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      cartTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
