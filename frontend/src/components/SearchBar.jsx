import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex flex-col sm:flex-row gap-2 p-2 sm:p-2.5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 ${
          isFocused ? 'shadow-primary/20 scale-[1.01]' : ''
        }`}>
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search amazing products..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-44 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none outline-none text-gray-800 dark:text-white cursor-pointer transition-colors"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 active:bg-primary/80 text-white rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 min-w-[120px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
        
        {query && (
          <div className="absolute top-full left-0 right-0 mt-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl animate-fade-in-up z-10">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Searching for "{query}" in {category || "all categories"}
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
