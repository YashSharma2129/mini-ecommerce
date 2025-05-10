const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    try {
        const { paymentMethodId, amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: `${process.env.FRONTEND_URL}/order-confirmation`,
        });

        res.json({ 
            success: true,
            clientSecret: paymentIntent.client_secret 
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    processPayment
};
