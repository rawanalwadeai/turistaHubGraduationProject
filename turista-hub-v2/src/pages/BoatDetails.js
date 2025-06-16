import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import useFetchA from '../hooks/useFetchA';
import { BASE_URL } from '../utils/configB';
import calculateAvgRating from '../utils/avgRating';
import BookingBoat from '../componenets/Booking/BookingBoat';
import avatar from '../assets/images/avatar.jpg';


import { useTranslation } from 'react-i18next';


const BotDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [boatRating, setBoatRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useContext(AuthContext);

  const { data: boat, loading, error } = useFetchA(`${BASE_URL}/boats/${id}`);


  const {t}= useTranslation()
  
  const {
    image_url,
    title,
    company_name,
    desc,
    price_per_hour,
    type,
    usage,
    speed,
    batteryLife,
    reviews
  } = boat || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
            return toast.error(t('signInError'));
     
    }

     if (isSubmitting) return;

    const reviewObj = {
      productType: 'Boat',
      productId: id,
      username: user?.username,
      reviewText,
      rating: boatRating,
    };

    
  setIsSubmitting(true); // قفل الإرسال مؤقتًا

    try {
      const res = await fetch(`${BASE_URL}/reviews/boats/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();


      if (!res.ok) return toast.error(result.message);
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
     finally {
    setIsSubmitting(false); // نسمح بالإرسال مرة ثانية
  }
  };

  useEffect(() => {
    window.scrollTo(0, 0);


  
  }, [boat]);





  return (
    <section>
      <Container>
        {loading && <h4 className='text-center pt-5'>{t('loading')}</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}

        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={image_url} alt={title} />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="fa-solid fa-star" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? t('notRated') : <span>({reviews.length})</span>}
                    </span>

                    <span><i className="fa-solid fa-robot"></i> {t('type')}: {type}</span>
                  </div>

                  <div className="tour__extra-details">
                    {/* <span><i className="fa-solid fa-bolt"></i> Usage: {usage}</span>
                    <span><i className="fa-solid fa-gauge-high"></i> Speed: {speed} km/h</span>
                    <span><i className="fa-solid fa-battery-full"></i> Battery: {batteryLife} hrs</span> */}

                    <span className="company__name">{company_name}</span>

                    <span><i class="fa-solid fa-dollar-sign"></i>${price_per_hour} {t('pricePerSession')}</span>
                    <span><i className="fa-solid fa-utensils"></i> {t('meals')}</span>
                    <span><i className="fa-solid fa-music"></i> {t('music')}</span>
                    <span><i className="fa-solid fa-wifi"></i> {t('wifi')}</span>
                    <span><i className="fa-solid fa-snowflake"></i> {t('ac')}</span>
                    <span><i className="fa-solid fa-user-tie"></i>{t(' guide')}</span>
                    <span><i className="fa-solid fa-sun"></i> {t('outdoor')}</span>
                    <span><i className="fa-solid fa-person-swimming"></i> {t('swimming')}</span>


                  </div>

                  <h5>{t('description')}</h5>
                  <p>{desc}</p>
                </div>

                <div className="tour__reviews mt-4">
                  <h4>{t('reviews')} ( {reviews?.length}  {t('reviews')})</h4>



                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center  gap-3 mb-4 rating__group">



                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setBoatRating(star)}
                          className={boatRating >= star ? 'active' : ''}
                        >
                          <i className="fa-solid fa-star"></i>
                        </span>
                      ))}
                    </div>

                    <div className='review__input'>
                      <input type='text' ref={reviewMsgRef} placeholder={t('shareThoughts')} required />
                      <button className='btn primary__btn text-white' type='submit'   disabled={isSubmitting}>
                        {t('submit')}
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review.id}>
                        <img src={avatar} alt="user avatar" />
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
              <BookingBoat boat={boat} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default BotDetails;
