import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import Checkout from './Checkout';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4 px-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-fade-in">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-primary font-medium">${Number(item.price).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >-</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >+</button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              disabled={cartItems.length === 0}
              onClick={() => setShowCheckout(true)}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium disabled:opacity-50 
                hover:bg-primary-600 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Checkout Modal */}
          {showCheckout && (
            <Checkout onClose={() => {
              setShowCheckout(false);
              onClose();
            }} />
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
