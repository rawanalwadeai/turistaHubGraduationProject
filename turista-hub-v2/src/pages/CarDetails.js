import React, { useRef, useState, useContext, useEffect } from 'react';
import '../styles/tour-details.css'; 
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import BookingCar from '../componenets/Booking/BookingCar.js';



import useFetchA from '../hooks/useFetchA.js'
import { BASE_URL } from '../utils/configB.js'
import { toast } from 'react-toastify';

import { AuthContext } from './../context/AuthContext'



import { useTranslation } from 'react-i18next';
const CarDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [carRating, setCarRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation()

  const { user } = useContext(AuthContext)

  const { data: car, loading, error } = useFetchA(`${BASE_URL}/cars/${id}`)


  // استخراج الخصائص من كائن السيارة
  const { title, desc, price, address, reviews, photo, city, maxRentalPeriod } = car || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);


  // تنسيق التاريخ
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // معالجة إرسال المراجعة
  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    // معالجة إرسال المراجعة بعد التحقق من صحة المستخدم



    try {


      if (!user) {
        return toast.error(t('signInError'));
      }
     if (isSubmitting) return;


      const reviewObj = {
        productType: 'Car',
        productId: id,
        username: user?.username,
        reviewText,
        rating: carRating,
      }
        setIsSubmitting(true); // قفل الإرسال مؤقتًا


      const res = await fetch(`${BASE_URL}/reviews/cars/${id}`, {

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

      toast.success(result.message) 

    } catch (err) {
      toast.error(err.message)

    }  finally {
    setIsSubmitting(false); 
  }

  };




  return (
    <>
      <section>
        <Container>


          {
            loading && <h4 className='text-center pt-5'>{t('loading')}</h4>
          }
          {
            error && <h4 className='text-center pt-5'>{error}</h4>

          }
          {
            !loading && !error && <Row>
              <Col lg='8'>
                <div className="tour__content">
                  <img src={`/${photo}`} alt={title} />




                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="fa-solid fa-star" style={{ color: 'var(--secondary-color)' }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? t('notRated') : <span>({reviews.length})</span>}
                      </span>

                      <span>
                        <i className="fa-solid fa-location-dot"></i> {address}
                      </span>
                    </div>

                    <div className='tour__extra-details'>
                      {/* <span><i className="fa-solid fa-map-pin"></i> {city}</span> */}
                      <span><i class="fa-solid fa-dollar-sign"></i>${price} {t('pricePerDay')}</span>
                      <span>{t('maxRentalPeriod', { days: maxRentalPeriod })}</span>

                      <span><i className="fa-solid fa-car-side"></i> {t('model')}: {car.model}</span>
                      <span><i className="fa-solid fa-calendar"></i> {t('year')}: {car.year}</span>
                      <span><i className="fa-solid fa-gas-pump"></i> {t('fuelType')}: {car.fuelType}</span>
                      <span><i className="fa-solid fa-door-closed"></i> {t('doors')}: {car.doors}</span>
                      <span><i className="fa-solid fa-chair"></i> {t('seats')}: {car.seats}</span>
                      <span><i className="fa-solid fa-shield-alt"></i> {t('insurance')}: {car.insurance}</span>
                      <span><i className="fa-solid fa-car"></i> {t('condition')}: {car.condition}</span>
                      <span><i className="fa-solid fa-user-tie"></i> {t('driverOption')}: {car.driverOption}</span>
                      <span><i className="fa-solid fa-road"></i> {t('mileage')}: {car.mileage} km</span>
                      <span><i className="fa-solid fa-palette"></i> {t('color')}: {car.color}</span>
                      <span><i className="fa-solid fa-cogs"></i> {t('transmission')}: {car.transmission}</span>
                      <span><i className="fa-solid fa-truck"></i> {t('deliveryService')}: {car.deliveryService ? t('available') : t('notAvailable')}</span>
                      {car.amenities?.length > 0 && (
                        <span><i className="fa-solid fa-star"></i> {t('amenities')}: {car.amenities.join(', ')}</span>
                      )}
                    </div>

                    <h5>{t('description')}</h5>
                    <p>{desc}</p>
                  </div>

                  <div className='tour__reviews mt-4'>
                    <h4>{t('reviews', { count: reviews?.length || 0 })}</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center  gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setCarRating(star)}
                            className={carRating >= star ? 'active' : ''}
                          >
                            <i className="fa-solid fa-star"></i>
                          </span>
                        ))}
                      </div>

                      <div className='review__input'>
                        <input
                          type='text'
                          ref={reviewMsgRef}
                          placeholder={t('shareThoughts')}
                          required
                        />
                        <button className='btn primary__btn text-white' type='submit'>
                          {t('submit')}
                        </button>
                      </div>
                    </Form>

                    <ListGroup className='user__reviews'>
                      {reviews?.map(review => (
                        <div className='review__item' key={review.id}>
                          <img src={avatar} alt='' />
                          <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
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
                </div>
              </Col>

              <Col lg='4'>
                <BookingCar car={car} avgRating={avgRating} />
              </Col>
            </Row>


          }
        </Container>
      </section>
    </>
  );
};

export default CarDetails;
