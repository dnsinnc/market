
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
// import HomePage from './pages/HomePage';


function App() {

   return (

      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

   )
}

export default App
