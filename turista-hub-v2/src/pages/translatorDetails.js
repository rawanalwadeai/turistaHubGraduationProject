import React, { useEffect, useRef, useState, useContext } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'
import { toast } from 'react-toastify'
import useFetchA from '../hooks/useFetchA.js'
import { BASE_URL } from '../utils/configB.js'
import calculateAvgRating from '../utils/avgRating.js'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../componenets/Booking/Booking.js'
import { useTranslation } from 'react-i18next'

const TranslatorDetails = () => {
  const { id } = useParams()
  const reviewMsgRef = useRef('')
  const [translatorRating, setTranslatorRating] = useState(null)
  const { user } = useContext(AuthContext)
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: translator, loading, error } = useFetchA(`${BASE_URL}/translator/${id}`)
  const { photo, name, desc, price, location, reviews = [], languages } = translator || {}
  const { totalRating, avgRating } = calculateAvgRating(reviews)

  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const submitHandler = async e => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value

    try {
      if (!user) {
             return toast.error(t('signInError'));
      
      }
           if (isSubmitting) return;


      const reviewObj = {
        productType: 'Translator',
        productId: id,
        username: user?.username,
        reviewText,
        rating: translatorRating,
      }

        setIsSubmitting(true); // قفل الإرسال مؤقتًا


      const res = await fetch(`${BASE_URL}/reviews/translator/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      })

      const result = await res.json()
      if (!res.ok) return toast.error(result.message)

      toast.success(result.message)
    } catch (err) {
      toast.error(err.message)
    }
     finally {
    setIsSubmitting(false); // نسمح بالإرسال مرة ثانية
  }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [translator])

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">{t('loading')}</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}

        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <div className="tour__info">
                  <h2>{name}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="fa-solid fa-star" style={{ color: 'var(--secondary-color)' }}></i>{' '}
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? t('notRated') : <span>({reviews.length})</span>}
                    </span>

                    <span>
                      <i className="fa-solid fa-location-dot"></i> {location}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="fa-solid fa-language"></i> {languages?.join(', ')}</span>
                    <span><i className="fa-solid fa-turkish-lira-sign"></i> {t('sessionPrice', { price })}</span>
                  </div>

                  <h5>{t('description')}</h5>
                  <p>{desc}</p>
                </div>

                <div className="tour__reviews mt-4">
                  <h4>{t('reviews', { count: reviews?.length })}</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setTranslatorRating(star)}
                          className={translatorRating >= star ? 'active' : ''}
                        >
                          <i className="fa-solid fa-star"></i>
                        </span>
                      ))}
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder={t('shareYourThoughts')} required />
                      <button className="btn primary__btn text-white" type="submit">
                        {t('submit')}
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="user" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="fa-solid fa-star"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={translator} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
}

export default TranslatorDetails
