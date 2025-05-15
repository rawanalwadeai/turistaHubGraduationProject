import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';

import calculateAvgRating from '../utils/avgRating'


const BoatCard = ({ boats }) => {
  const {
    _id,
    boat_name,
    location,
    max_passengers,
    price_per_hour,
    image_url,
    company_name,
    rating,
    features,
    featured,
    reviews
  } = boats;
  const { totalRating, avgRating } = calculateAvgRating(reviews)


  return (
    <div className="tour__card"> 
             <Link to={`/boats/${_id}`} className='tour__card-link'>

      <Card>
        {/* صورة القارب */}
        <div className="tour__img">
            <img src={ image_url} alt="boat" />
            {featured && <span>Featured</span>}

         
        </div>

        <CardBody>
          {/* معلومات الموقع واسم الشركة */}
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="fa-solid fa-location-dot"></i> {location}
            </span>
            
            <span className='tour__rating d-flex align-items-center gap-1'>
              <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
            </span>
          </div>



          {/* اسم القارب */}
          <h5 className="tour__title">
            <Link to={`/boats/${_id}`}>{boat_name}</Link>
          </h5>

          {/* عدد الركاب */}
          <div className="tour__features d-flex align-items-center justify-content-between mt-2">
            <span><i className="fa-solid fa-user-group"></i> Up to {max_passengers} guests</span>
          </div>

          {/* المميزات */}
          {/* <div className="tour__services mt-2">
            {features.meals_provided && <span><i className="fa-solid fa-utensils"></i> Meals</span>}
            {features.music_system && <span><i className="fa-solid fa-music"></i> Music</span>}
            {features.wifi && <span><i className="fa-solid fa-wifi"></i> Wi-Fi</span>}
            {features.air_conditioned && <span><i className="fa-solid fa-snowflake"></i> A/C</span>}
            {features.tour_guide && <span><i className="fa-solid fa-user-tie"></i> Guide</span>}
            {features.outdoor_seating && <span><i className="fa-solid fa-sun"></i> Outdoor</span>}
            {features.swimming_allowed && <span><i className="fa-solid fa-person-swimming"></i> Swimming</span>}
          </div> */}

          {/* السعر وزر التفاصيل */}
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${price_per_hour} <span>/hour</span></h5>
            <Link to={`/boats/${_id}`} className="btn booking__btn">
              View Details
            </Link>
          </div>
        </CardBody>
      </Card> 
      </Link>
    </div>
  );
};

export default BoatCard;
