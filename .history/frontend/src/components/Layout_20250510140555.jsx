import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children, showHero = false, onSearch = () => {} }) => {
  const location = useLocation();
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-lg sm:text-xl font-bold text-primary truncate">
                Mini E-commerce
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <>
                  <Link
                    to="/add-product"
                    className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-600 transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Add Product
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-sm sm:text-base"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-600 transition-colors text-sm sm:text-base"
                >
                  Sign In
                </Link>
              )}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-primary hover:bg-primary/10 rounded-full relative group"
              >
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transform transition-transform group-hover:scale-110">
                  {cartCount}
                </span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Show Hero only on homepage */}
      {isHomePage && (
        <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden px-4">
          {/* Animated Wave Background */}
          <div className="absolute inset-0">
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path className="animate-wave fill-primary/10" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          {/* Parallax Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
              <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
              <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              >
                <div className="h-2 w-2 bg-primary/20 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block animate-bounce mb-4">
                <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary dark:text-primary-foreground">
                  ✨ Welcome! Start exploring our products
                </span>
              </div>
              
              <div className="relative inline-block mb-4 sm:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                    Discover Amazing Products
                  </span>
                </h1>
                <div className="absolute -top-4 -right-4 animate-bounce delay-1000">
                  <span className="text-3xl">🎉</span>
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 animate-fade-in-up px-4">
                Find the perfect items from our curated collection of premium products
              </p>

              {/* Mobile-Optimized Search Input Container */}
              <div className="relative max-w-xl mx-auto group animate-fade-in-up px-4 sm:px-0">
                <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full sm:rounded-r-none 
                      border border-gray-200 dark:border-gray-700 bg-white/90 
                      dark:bg-gray-800/90 backdrop-blur-sm focus:ring-2 
                      focus:ring-primary focus:border-transparent transition-all 
                      duration-300 outline-none shadow-lg hover:shadow-xl 
                      text-sm sm:text-base"
                  />
                  <button 
                    className="flex items-center justify-center gap-2 
                      bg-primary text-white rounded-full sm:rounded-l-none 
                      py-3 px-6 sm:px-8 font-medium hover:bg-primary-600 
                      transition-colors shadow-lg hover:shadow-xl
                      text-sm sm:text-base w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="sm:hidden">Search</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up px-4">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Top Rated Products</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  <span>Best Quality</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 w-full">
        <div className={`container mx-auto px-4 py-8 ${!isHomePage ? 'mt-8' : ''}`}>
          {children}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-lg mt-8">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Us</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We are committed to providing the best shopping experience with curated products and excellent customer service.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/add-product" className="hover:text-primary transition-colors">Add Product</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@miniecommerce.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.274c-.259.628-.651 1.276-1.175 1.797-.524.522-1.173.914-1.802 1.173-.628.259-1.297.389-2.006.389-.71 0-1.379-.13-2.007-.389-.628-.259-1.277-.651-1.802-1.173-.524-.521-.916-1.169-1.175-1.797-.259-.628-.389-1.297-.389-2.006s.13-1.379.389-2.007c.259-.628.651-1.276 1.175-1.797.524-.522 1.174-.914 1.802-1.173.628-.259 1.297-.389 2.007-.389.709 0 1.378.13 2.006.389.629.259 1.277.651 1.802 1.173.524.521.916 1.169 1.175 1.797.259.628.389 1.297.389 2.007s-.13 1.378-.389 2.006z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2023 Mini E-commerce. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ by passionate developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
