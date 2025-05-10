import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout showHero={true}><ProductList /></Layout>} />
          <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
        </Routes>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
