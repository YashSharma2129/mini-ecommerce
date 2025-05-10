import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import OrderConfirmation from './components/OrderConfirmation';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Layout showHero={true}><ProductList /></Layout>} />
            <Route path="/add-product" element={
              <PrivateRoute>
                <Layout><AddProduct /></Layout>
              </PrivateRoute>
            } />
            <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
            <Route path="/order-confirmation" element={<Layout><OrderConfirmation /></Layout>} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
