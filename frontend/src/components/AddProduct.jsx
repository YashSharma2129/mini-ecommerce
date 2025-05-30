import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: ''
  });

  // Using a lightweight SVG as default image
  const defaultImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9ca3af" text-anchor="middle">
        No Image Available
      </text>
    </svg>
  `)}`;

  const validateImageUrl = (url) => {
    if (!url) return defaultImage;
    try {
      const parsedUrl = new URL(url);
      // Accept http, https, and data URLs
      if (!['http:', 'https:', 'data:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid URL protocol');
      }
      return url;
    } catch (error) {
      toast.error('Please enter a valid image URL');
      return defaultImage;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate price
      const price = Number(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      // Validate and format image URL
      const validatedImageUrl = validateImageUrl(formData.imageUrl);
      
      // Prepare submission data
      const submitData = {
        ...formData,
        imageUrl: validatedImageUrl
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/products`, 
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      toast.success('Product added successfully');
      navigate('/');
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error.response?.data?.message || 'Error adding product');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      // Strip any whitespace from image URLs
      setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-600 focus:ring-4 focus:ring-primary/50 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
