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



import experienceImg from '../assets/images/experience.png'



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
                  {/* We offer everything you need in one place ,from home rentals and car hire to guided tour bookings.
Comfortable, safe, and unforgettable experiences are waiting for you. */}

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


      { /*-----  experience section end   -----*/}

      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='experience__content'>
                <Subtitle subtitle={t('experience')} />

                <h2>{t('trusted_travel_partner')}</h2>
                <p>

                  {t('best_travel_experience')}
                </p>
              </div>

              {/* <div className='counter__wrapper d-flex align-items-center gap-5'>

<div className='counter__box'>
  <span>12k+</span>
<h6>Successfull Trip</h6>
</div>

<div className='counter__box'>
  <span>2k+</span>
<h6>Regular Clients</h6>
</div>

<div className='counter__box'>
  <span>15</span>
<h6>Years Experience</h6>
</div>
        </div> */}



            </Col>
            <Col lg='6'>
              <div className='expreience__img'>
                <img src={experienceImg} alt='' />
              </div>
            </Col>

          </Row>
        </Container>
      </section>


      { /*-----  experience section end   -----*/}



      { /*-----  galery section start   -----*/}


      {/* <section>
  <Container>
    <Row>
      <Col lg='12'>
      <Subtitle subtitle={'Gallery'} />
      <h2 className='gallery__title' >Visit our Coustomers Tour Gallery</h2>
<h2>1.12 -- 1.18 time of the touturial :I will leave this section bc maybe i will not add it to the web app</h2>
      </Col>
    </Row>
  </Container>
</section> */}


      { /*-----  galery section end   -----*/}



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


      { /*-----  newsLETTER START  
THIS SECTION MAYBE I WILL ADD IT LATER 
FORM PART 1 
1.23 TO 1.29

-----*/}











    </div>
  )
}

export default Home