import "./App.css";
// import logo from './Assets/Logo.svg';

import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
 import About from "./components/About";
 import Work from "./components/Work";
 import Testimonial from "./components/Testimonial";
 import Contact from "./components/Contact";
//  import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import Cart from "./components/cart/cart";
import Checkout from "./components/checkout/checkout";
import  Profile  from "./components/profile/profile";
import ProductPage from "./components/product/products";
import ProductDetails from "./components/product/productdetails";
import Login from "./components/profile/signin";
import Register from "./components/profile/signup";
import Navbar from "./components/Navbar";
import Wishlist from "./components/wishlist/wishlist";
import OrderConfirmation from "./components/order-confirmation";


function App() {
  return (
    <>
      <div className="App">
      
     
      <UserProvider>
      
    <BrowserRouter>  
    
    <Navbar/>
    <Routes>
   
  <Route path="/*"element={<Home />}></Route>
  <Route path="/About"element={<About/>}></Route>
  <Route path="/Work"element={<Work />}></Route>
  <Route path="/Testimonial"element={<Testimonial />}></Route>
  <Route path="/Contact"element={<Contact />}></Route>
  <Route path="/signup"element={<Register/>}></Route>
  <Route path="/signin"element={<Login />}></Route>
  <Route path="/wishlist"element={<Wishlist />}></Route>
  <Route path="/order-confirmation"element={<OrderConfirmation />}></Route>

  
  <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/product" element={<ProductPage/>}/>
                <Route path="/productdetails/:id" element={<ProductDetails/>}/>
                
  
  </Routes>
  
  </BrowserRouter>  
  </UserProvider>
  
  </div>
   </>
       
      
   
  );
}

export default App;
