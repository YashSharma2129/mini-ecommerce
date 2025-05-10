const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, images } = req.body;
    const userId = req.user._id; // From auth middleware

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
      images: images || []
    });

    // Update product average rating
    const reviews = await Review.find({ productId });
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { rating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: Could not fetch reviews');
  }
};

module.exports = {
  createReview,
  getProductReviews
};
