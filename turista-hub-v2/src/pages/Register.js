import React, { useState , useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container,Row ,Col,FormGroup ,Form ,Button } from 'reactstrap'






import '../styles/login.css'
import registerImg from '../assets/images/register.png'
import userIcon  from '../assets/images/user.png'

//I
import {AuthContext} from '../context/AuthContext';
import { BASE_URL } from '../utils/configB'


import { toast } from 'react-toastify';

const Register = () => {


  const [credentials , setCredentials] = useState({
    username:undefined,
  email:undefined,
  password:undefined,
  role:'user'

  });


  //I
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate()




  const handleChange = e=> {

    setCredentials(prev => ({...prev , [e.target.id]:e.target.value}))
  }



// const handleClick = async e=> {
//   e.preventDefault()


// //I
//   try{

// const res = await fetch(`${BASE_URL}/auth/register` , {
//   method:'post',
//   headers:{
//     'content-type' : 'application/json'
//   }, 
//   body: JSON.stringify(credentials)
// })
// const result = await res.json()


// if(!res.ok) {alert(result.message)}



// dispatch({type:'REGISTER_SUCCESS'})
// navigate('/home')
//   }catch(err){
// alert(err.message)
//   }


// }

const handleClick = async e => {
  e.preventDefault();

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const result = await res.json();

    if (!res.ok) {
      return toast.error(result.message);
    }

    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const loginResult = await loginRes.json();

    if (!loginRes.ok) {
      return toast.error(loginResult.message);
    }

    // تحديث السياق وتوجيهه للصفحة الرئيسية:
    dispatch({ type: 'LOGIN_SUCCESS', payload: loginResult.data });
    navigate('/home');

  } catch (err) {
    toast.error(err.message);
  }
};




  return (
    <section>
      <Container>

<Row>
  <Col lg='8' className='m-auto'> 

  <div className='login__container d-flex justify-content-between' >
<div className='login__img'>
    <img src={registerImg} alt='' />
</div>


<div className='login__form'>
  <div className='user'>
    <img src={userIcon} alt='' />



  </div>

<h2>Register</h2>

<Form onSubmit={handleClick}>
<FormGroup>
    <input type='text' autoComplete='off'  placeholder='Username' required id="username" onChange={handleChange} />
  </FormGroup>
  <FormGroup>
    <input type='email' autoComplete='off'   placeholder='Email' required id="email" onChange={handleChange} />
  </FormGroup>
  <FormGroup>
    <input type='password'  placeholder='Password' required id="password" onChange={handleChange} />
  </FormGroup>

  <Button className='btn secondary__btn auth__btn' type='submit'>Create Account </Button>

</Form>

<p>Already have an account ?  <Link to='/login'>Login</Link></p>

</div>
    </div>

  </Col>
</Row>

      </Container>
    </section>
    
  )
}

export default Register