import '../../scss/App.scss';
import React from 'react';
import {
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
import './auth.scss';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Login() {
  return (
    <>
      <br/>
      <h3>LOGIN</h3> <br></br>
      <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password'/>

      <div className='d-flex justify-content-between mb-4'>
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label ='Remember me' />
        <a href="/">Forgot password?</a>
      </div>

      <Button className='w-100 mb-4' size='md'>sign in</Button>
      <br/>
      <br/>
      <div>
        Don't have an account?<Link to='/register'> Sign Up</Link>
      </div>
      
    </>
    
  );
}

export default Login;