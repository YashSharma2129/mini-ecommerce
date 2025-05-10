# Mini E-commerce Platform 

A modern e-commerce platform built with MERN stack featuring a two-tab interface for product management.

## Features

- Two main tabs:
  1. **Product Submission Tab**
     - Add new products with name, price, description, and image URL
     - Real-time form validation
     - Instant feedback on submission
  2. **My Products Tab**
     - View all submitted products in a card layout
     - Real-time updates when new products are added
     - Smart search functionality
- Responsive design
- Product search with keyword matching
- Clean and intuitive user interface

## Prerequisites

- Node.js >= 14
- MongoDB
- Git

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mini-ecommerce.git
   cd mini-ecommerce
   ```

2. Set up environment files:
   ```bash
   # Backend setup
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB credentials

   # Frontend setup
   cd ../frontend
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. Start the application:
   ```bash
   # Start backend (from backend directory)
   npm start

   # Start frontend (from frontend directory)
   npm start
   ```

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: React Context
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Search**: Keyword matching algorithm

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | /api/products     | Get all products     |
| POST   | /api/products     | Create product       |
| GET    | /api/products/:id | Get single product   |
| GET    | /api/products/search | Search products   |

## Environment Variables

### Backend
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: development/production

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## Project Structure

```
mini-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm/      # Product submission tab
│   │   │   ├── ProductList/      # My products tab
│   │   │   └── SearchBar/        # Search functionality
│   │   └── ...
├── backend/
│   ├── routes/
│   │   └── products.js           # Product API endpoints
│   └── ...
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## What's Working

- ✅ Two-tab interface implementation
- ✅ Product submission form with validation
- ✅ Product listing with card layout
- ✅ Search functionality with keyword matching
- ✅ Real-time updates
- ✅ Responsive design
- ✅ MongoDB integration
- ✅ RESTful API endpoints