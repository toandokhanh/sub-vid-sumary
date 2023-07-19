import { 
  BrowserRouter, 
  Routes,
  Route
} from 'react-router-dom';
import React from 'react';
import './App.css';
import MyComponent from './components/MyComponent';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MyComponent />}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default App;
