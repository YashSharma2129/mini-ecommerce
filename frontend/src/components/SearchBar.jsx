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
        <div className={`flex flex-col sm:flex-row gap-2 p-2 sm:p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ${
          isFocused ? 'shadow-primary/20 scale-[1.01]' : ''
        }`}>
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 sm:py-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm sm:text-base"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 sm:py-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm sm:text-base"
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
              className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-lg text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
