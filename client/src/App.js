import { 
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import MyComponent from './components/MyComponent';
import Auth from './views/Auth'
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MyComponent />}/>
        <Route exact path='/login' element={<Auth authRoute='login'/>}/>
        <Route exact path='/register' element={<Auth authRoute='register'/>}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default App;
