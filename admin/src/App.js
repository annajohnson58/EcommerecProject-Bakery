// import React from 'react'
// import Navbar from './components/navbar/navbar';
// import Admin from './pages/admin/admin';
// import {BrowserRouter, Route,Routes } from 'react-router-dom';

// import Register from './pages/register/register';
// import Login from './pages/login/login';

//  const App = () => {
//   return (
//     <>
//     <BrowserRouter>
//      <Navbar/>
     
//      <Routes>
//      <Route path="/*" element={<Admin/>}/>
     
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/login" element={<Login/>}/>

        
//        </Routes>
     
//        </BrowserRouter>
     
     
     
     
      
      
   
//      </>
    
  
//   )
// }
// export default App;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Admin from './pages/admin/admin';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Sidebar from './components/sidebar/sidebar';

const App = () => {
    return (
        <> 
        <BrowserRouter>
            
            
        <Navbar/>
             
            <main>
                <Routes>
               
                    <Route path="/*" element={<Admin />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                   
                    
                </Routes>
            </main>
            
        </BrowserRouter>
        </>
    );
};

export default App;