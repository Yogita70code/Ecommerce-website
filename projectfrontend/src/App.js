import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Registration from './Registration';
import Loginu from './Loginu';
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Header/Home';
import About from './Components/Header/About';
import Deals from './Components/Header/Deals';
import ProductDetails from './Components/Header/ProductDetails';
import Brand from './Components/Header/Brand';
import Blog from './Components/Header/Blog';
import Contact from './Components/Header/Contact';
import Cart from './Components/Header/Cart';
import Nopage from './Components/Header/Nopage';
import UserDetails from './Components/Header/UserDetails';
import CheckOut from './Components/Header/CheckOut';
import OrderConfirm from './Components/Header/OrderConfirm';
import Order from './Components/Header/Order';
import CartItem from './Components/Header/CartItem';
import ForgetPage from './Components/Header/ForgetPage';
import Merchant from './Components/Header/Merchant';

function App() {
  return (
    // <div className="App">
    //   <Header/>
    //   <Registration/>
    //   <Loginu/>
      
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
        
    //   </header> */}
      
      
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index  element = {<Home />}/>
        <Route path="about"element={<About />}/>
         <Route path="deals" element={<Deals/>}/>
         <Route path="login" element={<Loginu/>}/>
         <Route path="forgetpage" element={<ForgetPage/>}/>
         <Route path="registration" element={<Registration/>}/>
         <Route path="checkout/Id/:id" element={<CheckOut/>}/>
         <Route path="checkout/Id/:id/order_confirmation" element={<OrderConfirm/>}/>
         <Route path="product/Id/:id" element={<ProductDetails/>}/>
         <Route path="brand" element={<Brand/>}/>
         <Route path="blog" element={<Blog/>}/>
         <Route path="order" element={<Order/>}/>
         <Route path="contact" element ={<Contact/>}/>
         <Route path="cart" element ={<Cart/>}/>
         <Route path="cartitem" element ={<CartItem/>}/>
         <Route path="userDetails" element ={<UserDetails/>}/>
         <Route path="merchant" element ={<Merchant/>}/>
         <Route path="*" element ={<Nopage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
     
  );
}

export default App;
