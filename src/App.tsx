
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';



function App() {

   return (

      <Routes>
         <Route path="/market" element={<HomePage />} />
         <Route path="/market/product/:id" element={<ProductPage />} />
      </Routes>

   )
}

export default App
