import React from 'react'
import '../styles/home.css'
import { Container, Row ,Col } from 'reactstrap'
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


import i18n from '../i18n';



const Home = () => {
  return (
   <div>

    {/**   hero sectio   */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className='hero__content'>
            <div className='hero__subtitle d-flex align-items-center'>
              <Subtitle subtitle={'know before you go'}/>
              <img src={worldImg} alt="" />
            </div>
            <h1>TRAVELLING OPENS THE DOOR TO CREATING<span
            className='highlight'> Memories </span> </h1>
          
          <p> 
{/* We offer everything you need in one place ,from home rentals and car hire to guided tour bookings.
Comfortable, safe, and unforgettable experiences are waiting for you. */}

Your trip, made easy—homes, cars, and tours in one place

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
   <video src={heroVideo} alt=""  controls/>
   </div>
   </Col>

   <Col lg='2'>
   <div className='hero__img-box mt-5'>
    <img alt="" src={heroImg2} />
</div>
  </Col>


  <button className='btn primary__btn w-100 mt-4' onClick={() => i18n.changeLanguage('ar')}>العربية</button>
<button className='btn primary__btn w-100 mt-4' onClick={() => i18n.changeLanguage('en')}>English</button>


{/* <SearchBar /> */}
        </Row>
      </Container>
    </section>

        {/**  -------------------- hero sectio  -------------------- */}



        <section>
<Container>
  <Row>
    <Col lg='3'>
    <h5 className='service__subtitle'>What we Serve</h5>
    <h2 className='service__title'>We Offer Our Best Service </h2>
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
      <Subtitle subtitle={'Explore'} />
      <h2 className='featured__tour-title'>Our featured tours</h2>
      </Col>
      <FeaturedTourList />
    </Row>


    <Row>
      <Col lg='12' className='mb-5'>
      <h2 className='featured__tour-title'>Our featured boats</h2>
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
        <Subtitle subtitle={'Experience'} />

        <h2>Your Trusted Travel Partner </h2>
        <p>
         
        We are committed to offering you 
        the best travel experience
         
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
        <img src={experienceImg}  alt=''/>
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
      <Subtitle subtitle={' Customer Testimonials'} />
      <h2 className='testimonial__title'>What Our Customers Say About Us</h2>
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