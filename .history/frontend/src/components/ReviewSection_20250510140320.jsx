import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ReviewSection = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews/${productId}`
      );
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch reviews error:', error);
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        { ...newReview, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Review submitted successfully');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Form */}
      {user && (
        <form onSubmit={handleSubmitReview} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Write a Review</h3>
          
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setNewReview(prev => ({ ...prev, rating: index + 1 }))}
                className="text-2xl"
              >
                {index < newReview.rating ? '★' : '☆'}
              </button>
            ))}
          </div>

          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Share your thoughts..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
            rows="3"
            required
          />

          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {loading ? (
          <div>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet</div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.userId.name}</span>
                  <span className="text-yellow-400">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
