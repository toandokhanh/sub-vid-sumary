import '../../scss/App.scss';
import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './auth.scss';
function Register() {
  return (
    <>
      <h3>REGISTER</h3> <br></br>
      <MDBRow>
          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' placeholder='First name' id='form1' type='text'/>
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' placeholder='Last name' id='form1' type='text'/>
          </MDBCol>
      </MDBRow>

      <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email'/>
      <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password'/>

      <div className='d-flex mb-4'>
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label ='I have read and agree to the terms' />
      </div>

      <Button className='w-100 mb-4' size='md'>sign up</Button>
      <br/>
      <br/>
      <div>
        If you already have an account<Link to='/login'> Sign In</Link>
      </div>
    </>
    
  );
}

export default Register;