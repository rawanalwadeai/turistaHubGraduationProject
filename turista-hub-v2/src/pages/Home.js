import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img1.jpg'
import heroImg2 from '../assets/images/hero-img2.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from '../shared/Subtitle'
import worldImg from '../assets/images/world.png'


import SearchBar from '../shared/SearchBar'

import ServiceList from '../services/ServiceList'

import FeaturedTourList from '../componenets/Featured-tours/FeaturedTourList'
import FeaturedBoatList from '../componenets/Featured-boats/FeaturedBoatList'






import Testimonial from '../componenets/Testimonial/Testimonial'
import { useTranslation } from 'react-i18next'


const Home = () => {
  const { t } = useTranslation()

  return (
    <div>

      {/**   hero sectio   */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='hero__content'>
                <div className='hero__subtitle d-flex align-items-center'>
                  <Subtitle subtitle={t('know_before_you_go')} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>{t('travelling_opens_the_door')}<span
                  className='highlight'> {t('memories')} </span> </h1>

                <p>
  
                  {t('trip_description'
                  )}
                </p>


              </div>
            </Col>

            <Col lg='2'>
              <div className='hero__img-box'>
                <img alt="" src={heroImg} />
              </div>
            </Col>

            <Col lg='2'>
              <div className='hero__img-box hero__video-box mt-4'>
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>

            <Col lg='2'>
              <div className='hero__img-box mt-5'>
                <img alt="" src={heroImg2} />
              </div>
            </Col>


            <Col lg='6'>
              <div className='search_sec'>
                <h5 className='service__subtitle'>{t('explore_search')}</h5>
                <SearchBar />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/**  -------------------- hero sectio  -------------------- */}



      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='service__subtitle'>{t('what_we_serve')}</h5>
              <h2 className='service__title'>{t('best_service')}</h2>
            </Col>
            <ServiceList />

          </Row>
        </Container>
      </section>


      { /*-----  featured  section start   -----*/}
      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <Subtitle subtitle={t('explore')} />
              <h2 className='featured__tour-title'>{t('featured_tours')}</h2>
            </Col>
            <FeaturedTourList />
          </Row>


          <Row>
            <Col lg='12' className='mb-5'>
              <h2 className='featured__tour-title'>{t('featured_boats')}</h2>
            </Col>
            <FeaturedBoatList />

          </Row>
        </Container>
      </section>
      { /*-----  featured  section end   -----*/}

      { /*----- testimonial start   -----*/}

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={t('customer_testimonials')} />
              <h2 className='testimonial__title'>{t('what_customers_say')}</h2>
            </Col>
            <Col lg='12'>
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>

      { /*-----  testimonial end   -----*/}

    </div>
  )
}

export default Home