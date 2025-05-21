import React from 'react'
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

import { useTranslation } from 'react-i18next'


const quick__links = [
  {
    path: '/home',
    display: 'Home'
  },
  // {
  //   path: '/about',
  //   display: 'About'
  // },
  {
    path: '/tour',
    display: 'Tour'
  },
  {
    path: '/houses',
    display:'Houses'
  },
  {
    path: '/cars',
    display:'Cars'
  }


]


const quick__links2 = [
  // {
  // path:"/gallery",
  // display:"Gallery",
  // },

  {
    path: "/login",
    display: "Login",
  },

  {
    path: "/register",
    display: "Register",
  },


]

const Footer = () => {

  const {t} = useTranslation()

const year = new Date().getFullYear();


  return <footer className='footer'>

    <Container>
      <Row>
        <Col lg='3'>
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <p>loere jfhnjnfeu hefihh ihfw uwebhfib  rawna bwiu</p> */}
            <div className='social__links d-flex align-items-center gap-4' >

              <span>
                <Link to='#'>
                 <i className="fa-brands fa-instagram"></i>
                </Link>
              </span>

              <span>
                <Link to='#'>
                 <i className="fa-brands fa-github"></i>  </Link>
              </span>

              <span>
                <Link to='#'>
                 <i className="fa-brands fa-facebook"></i>  </Link>
              </span>


              <span>
                <Link to='#'>
                 <i className="fa-brands fa-youtube"></i>  </Link>
              </span>

            </div>



          </div>


        </Col>



        <Col lg='3'>
          <h5 className='footer__link-title'>{t('Discover')}</h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{t(item.display)}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>

        </Col>


        <Col lg='3'>
          <h5 className='footer__link-title'> {t('Quick links')}</h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links2.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{t(item.display)}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>

        </Col>




        <Col lg='3'>
          <h5 className='footer__link-title'> {t('Contacts')}</h5>
          <ListGroup className='footer__quick-links'>

            <ListGroupItem className='ps-0 border-0 d-flex align-items-center'>

              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                 <i className="fa-solid fa-location-dot"></i>
                 {t('Address')}

                </span></h6>

              <p className='mb-0'>  Turkey , Istanbul</p>
            </ListGroupItem>


            <ListGroupItem className='ps-0 border-0 d-flex align-items-center'>

              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
               <i className="fa-solid fa-envelope"></i>{t('Email')}:

                </span></h6>

              <p className='mb-0'> rawanrawan17@icloud.com</p>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center'>

              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
               <i className="fa-solid fa-phone"></i>{t('Phone')}:
                </span></h6>

              <p className='mb-0'> 05526462923</p>
            </ListGroupItem>


          </ListGroup>
        </Col>



        <Col lg='12' className='text-center pt-5'>
        <p className='copyright'>

{/* Copyright {year} , */}
Designed and Developed by Rawan Alwadeai
          </p>
          </Col>
      </Row>
    </Container>

  </footer>
}

export default Footer