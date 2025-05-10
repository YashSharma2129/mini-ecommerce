# E-commerce Platform - Internship Project

A professional full-stack e-commerce platform demonstrating modern web development practices and industry standards.

## Technical Skills Demonstrated

- **Frontend Development**
  - React.js with Hooks and Context API
  - Modern JavaScript (ES6+)
  - Responsive design with Tailwind CSS
  - Component-based architecture
  - State management best practices

- **Backend Development**
  - Node.js and Express.js RESTful API
  - MongoDB with Mongoose ODM
  - JWT-based authentication
  - MVC architecture
  - Middleware implementation

- **Professional Development Practices**
  - Git version control
  - Environment configuration
  - Error handling and logging
  - API security best practices
  - Clean code principles

## Features

### User Features
- 🛍️ Browse products with search and category filters
- 🛒 Shopping cart with persistent storage
- 💝 Wishlist functionality
- 🔍 Product search with instant results
- 👤 User authentication and profiles
- 📱 Fully responsive design
- 🌙 Dark mode support

### Admin Features
- 📊 Admin dashboard with sales analytics
- 📦 Product management (CRUD operations)
- 📋 Order management and tracking
- 👥 User management

### Technical Features
- JWT authentication
- Real-time search
- Responsive image handling
- Form validation
- Error handling
- Toast notifications
- Protected routes

## Prerequisites

- Node.js >= 14
- MongoDB
- NPM or Yarn
- Git

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mini-ecommerce
   ```

2. Set up environment variables:

   Backend (.env):
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

   Frontend (.env):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Install dependencies:
   ```bash
   # Backend setup
   cd backend
   npm install

   # Frontend setup
   cd ../frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Deployment

### Backend Deployment (Heroku)

1. Create a Heroku account and install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=your_production_mongodb_uri
   heroku config:set JWT_SECRET=your_production_jwt_secret
   heroku config:set NODE_ENV=production
   ```

5. Deploy the backend:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Frontend Deployment (Netlify/Vercel)

1. Create a new project on Netlify/Vercel
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Environment variables: Add `REACT_APP_API_URL`

3. Deploy:
   ```bash
   npm run build
   ```

## Project Structure

```
mini-ecommerce/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID

## Common Issues & Troubleshooting

1. MongoDB Connection:
   - Ensure MongoDB is running
   - Verify connection string in .env

2. JWT Authentication:
   - Check token expiration
   - Verify JWT_SECRET in .env

3. CORS Issues:
   - Check CORS configuration in backend
   - Verify API URL in frontend .env

## Code Quality & Best Practices

- ✅ Proper error handling and validation
- ✅ Secure authentication implementation
- ✅ Clean and maintainable code structure
- ✅ Performance optimizations
- ✅ Modern ES6+ syntax
- ✅ Responsive design patterns
- ✅ RESTful API conventions

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Create Pull Request

## License

MIT License

## Support

For support, email support@miniecommerce.com