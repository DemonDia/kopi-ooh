import './App.css';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Error from './Pages/Error';
import Exit from './Pages/Exit';
import Menu from './Pages/Menu';
import Scan from './Pages/Scan';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import AdminHome from './Pages/AdminHome';
import ShowAvailableTables from './Pages/ShowAvailableTables';
// import {useGlobalContext} from "./Contexts/functionalContext"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div style = {{"marginTop":"80px"}}>
          <Routes>
            <Route path = "/" element = {<ShowAvailableTables/>}></Route>
            <Route path = "/:tableNum" element = {<Scan/>}></Route>
            <Route path = "/cart" element = {<Cart/>}></Route>
            <Route path = "/checkout" element = {<Checkout/>}></Route>
            <Route path = "/menu" element = {<Menu/>}></Route>
            <Route path = "/exit" element = {<Exit/>}></Route>
            <Route path = "/login" element = {<Login/>}></Route>
            <Route path = "/admin/home" element = {<AdminHome/>}></Route>
            <Route path = "*" element = {<Error/>}></Route>

          </Routes>
          
        </div>


      </Router>
    </div>
  );
}

export default App;
