# Mini E-commerce Platform

A modern e-commerce platform built with MERN stack.

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
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## Features

- [x] Product catalog
- [x] Shopping cart
- [x] Checkout process
- [x] Responsive design
- [x] Search functionality
- [x] Category filtering

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | /api/products     | Get all products     |
| POST   | /api/products     | Create product       |
| GET    | /api/products/:id | Get single product   |
| POST   | /api/orders       | Create order         |

## Environment Variables

### Backend
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: development/production

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.