import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import BookingHouse from '../componenets/Booking/BookingHouse.js';
import useFetchA from '../hooks/useFetchA.js';
import { BASE_URL } from '../utils/configB.js';
import { AuthContext } from './../context/AuthContext';
import { toast } from 'react-toastify';
import Slider from 'react-slick'

import { useTranslation } from 'react-i18next';

const HouseDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [houseRating, setHouseRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation();

  const { data: house, loading, error } = useFetchA(`${BASE_URL}/houses/${id}`);

  const { photo,images, title, desc, price, address, reviews, city,amenities, maxGroupSize, bedrooms, bathrooms, area } = house || {};
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
       return toast.error(t('signInError'));
        
      }
     if (isSubmitting) return;

      const reviewObj = {
        productType: 'House',
        productId: id,
        username: user?.username,
        reviewText,
        rating: houseRating,
      };

        setIsSubmitting(true); // قفل الإرسال مؤقتًا

        
      const res = await fetch(`${BASE_URL}/reviews/houses/${id}`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

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
  }, [house]);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">{t('loading')}</h4>}
        {error && <h4 className="text-center pt-5">{t('error')}</h4>}

        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                {/* <img src={photo} alt={title} /> */}
{house?.images && house.images.length > 0 && (
  house.images.length === 1 ? (
    <div className="mb-4">
      <img
        src={house.images[0]}
        alt={title}
        className="img-fluid rounded"
        style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none' }}
      />
    </div>
  ) : (
    <Slider
      dots={true}
      infinite={true}
      autoplay={true}
      speed={200}
      slidesToShow={1}
      slidesToScroll={1}
      className="mb-4"
    >
      {house.images.map((img, i) => (
        <div key={i}>
          <img
            src={img}
            alt={title}
            className="img-fluid rounded"
            style={{ width: '100%', height: '100%', objectFit: 'cover', border: 'none' }}
          />
        </div>
      ))}
    </Slider>
  )
)}

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="fa-solid fa-star" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating === 0 ? t('notRated') : avgRating}
                      {totalRating === 0 ? null : <span>({reviews.length})</span>}
                    </span>

                    <span>
                      <i className="fa-solid fa-location-dot"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="fa-solid fa-map-pin"></i> {city}
                    </span>
                    <span>
                     <i class="fa-solid fa-dollar-sign"></i> ${price} {t('perNight')}
                    </span>
                    <span>
                      <i className="fa-solid fa-user-group"></i> {maxGroupSize} {t('people')}
                    </span>
                    <span>
                      <i className="fa-solid fa-bed"></i> {bedrooms} {t('Bedroom')}
                    </span>
                    <span>
                      <i className="fa-solid fa-bath"></i> {bathrooms} {t('Bathroom')}
                    </span>
                    <span>
                      <i className="fa-solid fa-ruler-combined"></i> {area}
                    </span>


                  </div>

           {amenities && (
  <div className="house__amenities mt-4">
    <h5>{t('amenities')}</h5>
    <ul className="list-unstyled d-flex flex-wrap gap-3">

      {/* Boolean amenities */}
      {amenities.wifi && <li><i className="fa-solid fa-wifi"></i> {t('wifi')}</li>}
      {amenities.airConditioning && <li><i className="fa-solid fa-wind"></i> {t('airConditioning')}</li>}
      {amenities.heating && <li><i className="fa-solid fa-temperature-high"></i> {t('heating')}</li>}
      {amenities.tv && <li><i className="fa-solid fa-tv"></i> {t('tv')}</li>}
      {amenities.kitchen && <li><i className="fa-solid fa-kitchen-set"></i> {t('kitchen')}</li>}
      {amenities.coffeeMaker && <li><i className="fa-solid fa-mug-saucer"></i> {t('coffeeMaker')}</li>}
      {amenities.dishwasher && <li><i className="fa-solid fa-dishwasher"></i> {t('dishwasher')}</li>}
      {amenities.microwave && <li><i className="fa-solid fa-microchip"></i> {t('microwave')}</li>}
      {amenities.pool && <li><i className="fa-solid fa-person-swimming"></i> {t('pool')}</li>}
      {amenities.hotTub && <li><i className="fa-solid fa-hot-tub-person"></i> {t('hotTub')}</li>}
      {amenities.petsAllowed && <li><i className="fa-solid fa-dog"></i> {t('petsAllowed')}</li>}
      {amenities.smokingAllowed && <li><i className="fa-solid fa-smoking"></i> {t('smokingAllowed')}</li>}
      {amenities.elevator && <li><i className="fa-solid fa-elevator"></i> {t('elevator')}</li>}
      {amenities.restaurantAvailable && <li><i className="fa-solid fa-utensils"></i> {t('restaurant')}</li>}
      {amenities.breakfastIncluded && <li><i className="fa-solid fa-egg"></i> {t('breakfastIncluded')}</li>}
      {amenities.businessCenter && <li><i className="fa-solid fa-briefcase"></i> {t('businessCenter')}</li>}
      {amenities.wheelchairAccessible && <li><i className="fa-solid fa-wheelchair"></i> {t('wheelchairAccessible')}</li>}

      {/* String-based amenities */}
      {amenities.parking && (
        <li><i className="fa-solid fa-square-parking"></i> {t('parking')}: {t(amenities.parking)}</li>
      )}
      {amenities.laundry && (
        <li><i className="fa-solid fa-shirt"></i> {t('laundry')}: {t(amenities.laundry)}</li>
      )}
    </ul>
  </div>
)}


                  <h5>{t('description')}</h5>
                  <p>{desc}</p>
                </div>

                {/* قسم التعليقات */}
                <div className="tour__reviews mt-4">
                  <h4>
                    {t('reviews')} ({reviews?.length})
                  </h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} onClick={() => setHouseRating(star)} className={houseRating >= star ? 'active' : ''}>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder={t('shareThoughts')} required />
                      <button className="btn primary__btn text-white" type="submit">
                        {t('submit')}
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map(review => (
                      <div className="review__item" key={review.id}>
                        <img src={avatar} alt={review.userName} />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.userName}</h5>
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
              <BookingHouse house={house} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default HouseDetails;
