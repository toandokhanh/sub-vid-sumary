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
import About from './components/About/about';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './components/routing/ProtectedRoute'
const App = () => {
  return ( 
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login' element={<Auth authRoute='login'/>}/>
          <Route exact path='/register' element={<Auth authRoute='register'/>}/>
          <Route exact path='/dashboard' element={<ProtectedRoute component={Dashboard} />}/>
          <Route exact path='/about' element={<ProtectedRoute component={About} />}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
   );
}
 
export default App;
