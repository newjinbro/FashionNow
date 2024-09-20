import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import { Login } from './Component/Login';
import { Register } from './Component/Register';
import { Home } from './Component/Home';
import { Cart } from './Component/Cart';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Cart' element={<Cart/>}/>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
