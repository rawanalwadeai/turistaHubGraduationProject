import React, { useEffect, useRef, useState, useContext } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import tourData from '../assets/data/tours.js'
import calculateAvgRating from '../utils/avgRating'




import avatar from '../assets/images/avatar.jpg'

import Booking from '../componenets/Booking/Booking.js'


//G
import useFetchA from '../hooks/useFetchA.js'
import { BASE_URL } from '../utils/configB.js'


//L
import { AuthContext } from './../context/AuthContext'
import { toast } from 'react-toastify'


import { useTranslation } from 'react-i18next'

const TourDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()

  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false);

  //L
  const { user } = useContext(AuthContext)




  // //this is temporary static data bc later we will call our ABI and load our data from daatbase
  // const tour = tourData.find(tour => tour.id === id)
  //G
  //FETCH DATA DROM DATABASE
  const { data: tour, loading, error } = useFetchA(`${BASE_URL}/tours/${id}`)

  //destructure properties from tour object 

  // const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour
  //chat gpt tell me to edit the above one to this 
  const { photo, title, desc, price, address, reviews = [], city, maxGroupSize, tourDate } = tour || {}


  const { totalRating, avgRating } = calculateAvgRating(reviews)



  //format date 
  const options = { day: 'numeric', month: 'long', year: 'numeric' }


  //submitting request to the server
  const submitHandler = async e => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value




    // alert(`${reviewText} , ${tourRating}`);
    //for later to call the api


    //L
    try {


      if (!user ) {
        return toast.error(t('signInError'));
      }
           if (isSubmitting) return;



      const reviewObj = {
        productType: 'Tour',
        productId: id,
        username: user?.username,
        reviewText,
        rating: tourRating,
      }

        setIsSubmitting(true); // قفل الإرسال مؤقتًا

      const res = await fetch(`${BASE_URL}/reviews/tours/${id}`, {

        method: 'post',
        headers: {
          'content-type': 'application/json'

        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)

      })

      const result = await res.json()
      if (!res.ok) {
        return toast.error(result.message)
      }

      toast.success(result.message) //?

    } catch (err) {
      toast.error(err.message)

    }
     finally {
    setIsSubmitting(false); // نسمح بالإرسال مرة ثانية
  }
  }


  //G 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tour])


  return (
    <>

      <section>
        <Container>

          {/** G */}
          {
            loading && <h4 className='text-center pt-5'>{t('loading')}</h4>
          }
          {
            error && <h4 className='text-center pt-5'>{error}</h4>

          }
          {
            !loading && !error && <Row>
              <Col lg='8'>

                <div className='tour__content'>
                  <img src={photo} alt='' />

                  <div className='tour__info'>
                    <h2>{title}</h2>


                    <div className='d-flex align-items-centeer gap-5'>


                      <span className='tour__rating d-flex align-items-center  gap-1'>
                        <i className="fa-solid fa-star" style={{ 'color': "var(--secondary-color)" }}> </i> {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>
                        }
                      </span>




                      <span>
                        <i className="fa-solid fa-location-dot"></i> {address}

                      </span>



                    </div>


                    <div className='tour__extra-details'>


                      <span><i className="fa-solid fa-map-pin"></i> {city} </span>
                      <span><i className="fa-solid fa-turkish-lira-sign"></i>${price} {t('per_person')}</span>
                      {/* <span><i className="fa-solid fa-clock"></i>{distance} k/m  </span> */}

                      <span><i className="fa-solid fa-user-group"></i> {maxGroupSize} {t('people')} </span>


                      <span>
                        <i className="fa-solid fa-calendar-days"></i>{' '}
                        {new Date(tourDate).toLocaleDateString('en-CA')}
                      </span>


                    </div>

                    <h5>{t('description')}</h5>
                    <p>{desc}</p>

                  </div>



                  {/************** *************** tour reviews section start ************************/}


                  <div className='tour__reviews mt-4'>
                    <h4>{t('reviews')} ( {reviews?.length} {t(' reviews')})</h4>



                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center  gap-3 mb-4 rating__group">



                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setTourRating(star)}
                            className={tourRating >= star ? 'active' : ''}
                          >
                            <i className="fa-solid fa-star"></i>
                          </span>
                        ))}



                      </div>



                      <div className='review__input'>
                        <input type='text' ref={reviewMsgRef} placeholder={t('shareThoughts')}
                          required />
                        <button className='btn primary__btn text-white' type='submit'>

                          {t('submit')}
                        </button>
                      </div>
                    </Form>

                    <ListGroup className='user__reviews'>

                      {
                        reviews?.map(review => (
                          <div className='review__item'>
                            <img src={avatar} alt='' />

                            <div className='w-100'>
                              <div className='d-flex align-items-center justify-content-between'>


                                <div>
                                  <h5>{review.username} </h5>
                                  <p>{new Date(review.createdAt).toLocaleDateString(
                                    "en-US", options
                                  )}</p>
                                </div>


                                <span className='d-flex align-items-center'>
                                  {review.rating}<i className="fa-solid fa-star"></i>


                                </span>
                              </div>

                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>







                        ))}
                    </ListGroup>




                  </div>



                  {/************** *************** tour reviews section end ************************/}



                </div>
              </Col>



              <Col lg='4'>
                <Booking tour={tour} avgRating={avgRating} />

              </Col>

            </Row>
          }







        </Container>
      </section>




    </>)
}

export default TourDetails