import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, FormGroup, Form, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/configB'

import { useTranslation } from 'react-i18next'

const RegisterProvider = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '',
    phone: ''
  
  })
  const { t } = useTranslation()

  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...credentials, role: 'provider' })
      })

      const result = await res.json()

      if (!res.ok) {
        return toast.error(result.message)
      }

      // تسجيل الدخول تلقائياً بعد التسجيل:
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
      })

      const loginResult = await loginRes.json()

      if (!loginRes.ok) {
        return toast.error(loginResult.message)
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: loginResult.data })
      navigate('/provider-dashboard') // وجه مزود الخدمة لصفحة الداشبورد الخاصة بهم

    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src={registerImg} alt='' />
              </div>

              <div className='login__form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>

                <h2>{t('provider_register')}</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type='text'
                      autoComplete='off'
                      placeholder={t('username')}
                      required
                      id='username'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='email'
                      autoComplete='off'
                      placeholder={t('email')}
                      required
                      id='email'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='password'
                      placeholder={t('password')}
                      required
                      id='password'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='text'
                      placeholder={t('company_name')}
                      required
                      id='companyName'
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='tel'
                      placeholder={t('phone')}
                      required
                      id='phone'
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button className='btn secondary__btn auth__btn' type='submit'>
                    {t('create_provider_account')}                  </Button>
                </Form>

                <p>
                 {t('regular_user')}<Link to='/register'>{t('register_here')}</Link>
                </p>
                <p>
                 {t('already_have_account')}<Link to='/loginProvider'>{t('login')}</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default RegisterProvider
