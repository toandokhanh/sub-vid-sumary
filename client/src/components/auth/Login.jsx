import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../contexts/authContext';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
const Login = () => {
  // Context
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext)
  // Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const handleLogin = async event => {
		event.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			if(loginData.success) return navigate('/dashboard')
			console.log(loginData.message)
		} catch (error) {
			console.log(error)
		}
	}
  return (
    <>
      <Form className='my-4' onSubmit={handleLogin}>
        <h3 className='text-center'	>LOGIN</h3> <br></br>
				<MDBCol>
					<MDBInput
            			wrapperClass='mb-4'
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</MDBCol>
				<MDBCol>
					<MDBInput
            			wrapperClass='mb-4'
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</MDBCol>
				<div className='d-flex mb-4'>
				<MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label ='I have read and agree to the terms' />
				</div>
				<Button className='w-100 mb-4' type='submit' size='md'>sign up</Button>
			</Form>
      <div>
        Don't have an account?<Link to='/register'> Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
