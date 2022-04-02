import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';

import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Error from './Pages/Error';
import Exit from './Pages/Exit';
import Menu from './Pages/Menu';
import Scan from './Pages/Scan';
import Navbar from './Components/Navbar';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path = "/" element = {<Scan/>}></Route>
//         <Route path = "/checkout" element = {<Checkout/>}></Route>
//         <Route path = "/menu" element = {<Menu/>}></Route>
//         <Route path = "/exit" element = {<Exit/>}></Route>
//         <Route path = "*" element = {<Error/>}></Route>

//       </Routes>

//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <React.StrictMode>
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Scan/>}></Route>
          <Route path = "/cart" element = {<Cart/>}></Route>
          <Route path = "/checkout" element = {<Checkout/>}></Route>
          <Route path = "/menu" element = {<Menu/>}></Route>
          <Route path = "/exit" element = {<Exit/>}></Route>
          <Route path = "*" element = {<Error/>}></Route>

        </Routes>

      </Router>
    </React.StrictMode>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
