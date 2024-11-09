import './App.css'
import { useRoutes } from 'react-router-dom';
import HomePage from './pages/homePage.jsx';
import ProductDetails from './pages/Product_Details.jsx'; 
import ShoppingCart from './pages/shopping_cart.jsx';
import Navbar from './components/navbar';
import Search from './pages/search';

function App() {
  let element = useRoutes([
    {
      path: '*',
      element: <HomePage />
    },
    {
      path: '/product/:productId',
      element: <ProductDetails />
    },
    {
      path: '/shopping_cart',
      element: <ShoppingCart />
    },
    {
      path: '/search',
      element: <Search />
    }
  ])

  return (
    <>
      <Navbar />
      <div style={{ marginTop: '64px' }}>
        {element}
      </div>
    </>
  );
}

export default App
