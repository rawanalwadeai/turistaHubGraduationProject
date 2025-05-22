import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/login.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/configB';
import { toast } from 'react-toastify';

const LoginProvider = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',




  });
                console.log(credentials.role)

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials )
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);


      }

      if (result.data.role !== 'provider') {
        return toast.error('Access denied. Not a service provider.');
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      navigate('/provider-dashboard'); // replace with your actual dashboard route

    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="login" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="provider" />
                </div>

                <h2>Provider Login</h2>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button type="submit" className="btn secondary__btn auth__btn">
                    Login as Provider
                  </Button>
                </Form>

                <p>Don't have an account? <Link to="/serviceProvider">Register here</Link></p>
                <p>Want to login as a user? <Link to="/login">User Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginProvider;
