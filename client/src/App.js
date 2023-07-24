import { 
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import './App.css';
// import MyComponent from './components/MyComponent';
import Auth from './views/Auth';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/dashboard' element={<Dashboard />}/>
        <Route exact path='/login' element={<Auth authRoute='login'/>}/>
        <Route exact path='/register' element={<Auth authRoute='register'/>}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default App;
