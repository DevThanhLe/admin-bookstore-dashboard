import { BrowserRouter, Route, Routes} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { createContext } from 'react';
import { useState } from 'react';
import Login from './pages/Login/Login';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';
import User from './pages/Users/Users';
import Orders from './pages/Orders/Orders';


const MyContext = createContext();

function App() {

  const [isToggleSidebar,setIsToggleSidebar] = useState(false);
  const [isLogin,setIsLogin] = useState(false);
  const [isHideSidebarAndHeader,setIsHideSidebarAndHeader] = useState(false);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* Show header and sidebar if it is login */}
        {
          isHideSidebarAndHeader !==true &&
          <Header/>
        }

        <div className='main d-flex'>
          {
            isHideSidebarAndHeader !==true && 
            <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
              <Sidebar/>
            </div>
          }

          <div className={`content ${isHideSidebarAndHeader ===true? 'full' : ''} ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/Login" exact={true} element={<Login/>}/>
              <Route path="/" exact={true} element={<Login/>}/>
              <Route path="/Dashboard" exact={true} element={<Dashboard/>}/>
              <Route path="/Products" exact={true} element={<Products/>}/>
              <Route path="/Products/Details/:id" exact={true} element={<ProductDetails/>}/>
              <Route path="/Products/Details" exact={true} element={<ProductDetails/>}/>
              <Route path="/Users" exact={true} element={<User/>}/>
              <Route path="/Orders" exact={true} element={<Orders/>}/>


            </Routes>
          </div>

        </div>

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export {MyContext}
