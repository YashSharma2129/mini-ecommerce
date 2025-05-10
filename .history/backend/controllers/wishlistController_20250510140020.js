const Wishlist = require('../models/Wishlist');

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id; // From auth middleware

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        products: [productId]
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.json(wishlist);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    res.json(wishlist?.products || []);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: Could not fetch wishlist');
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
