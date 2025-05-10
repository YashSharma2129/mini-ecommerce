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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <Link to="/" className="text-base sm:text-lg md:text-xl font-bold text-primary truncate">
                Mini E-commerce
              </Link>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              {user ? (
                <>
                  <Link
                    to="/add-product"
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg bg-primary text-white hover:bg-primary-600 transition-colors whitespace-nowrap"
                  >
                    Add Product
                  </Link>
                  <button
                    onClick={logout}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg bg-primary text-white hover:bg-primary-600 transition-colors"
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

          <div className="container mx-auto px-4 relative z-10 pt-16 sm:pt-20 md:pt-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block animate-bounce mb-4 mt-4 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium bg-primary/10 text-primary dark:text-primary-foreground break-normal text-center">
                  ✨ Welcome! Start exploring our products
                </span>
              </div>
              
              <div className="relative inline-block mb-4 sm:mb-6 mt-2 sm:mt-4">
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
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/add-product" className="hover:text-primary transition-colors">Add Product</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>              <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect with Developer</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="https://yash-nebula.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Portfolio</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a href="https://linktr.ee/yashh2129" target="_blank" rel="noopener noreferrer" className="hover:text-primary">All Links</a>
                </li>
              </ul>
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/YashSharma2129" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/yash-sharma-a7a074236/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://x.com/YashSharma_21" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">            <p>© 2023 Mini E-commerce. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ by <a href="https://yash-nebula.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Yash Sharma</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
