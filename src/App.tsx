
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/MainPage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';

import './index.css';
import ListingPage from './pages/ListingPage/ListingPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';


function App() {

   return (

      <Routes>
         <Route path="/market" element={<HomePage />}  />
         <Route path="/market/product/:id" element={<ProductPage />} errorElement={'/market'} />
         <Route path="/market/cart" element={<CartPage />} />
         <Route path="/market/listing" element={<ListingPage />} />
         <Route path="/market/checkout" element={<CheckoutPage />} />
      </Routes>

   )
}

export default App
