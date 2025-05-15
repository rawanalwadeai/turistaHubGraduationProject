import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css'; 

import calculateAvgRating from '../utils/avgRating'

const HouseCard = ({ house }) => {
  const { _id, title, city, location, bedrooms, photo, price , reviews } = house;

  const { totalRating, avgRating } = calculateAvgRating(reviews)

  return (
    <div className="tour__card">
      <Link to={`/house/${_id}`} className='tour__card-link'>
      <Card>
        {/* Image with link */}
        <div className="tour__img">
          <Link to={`/house/${_id}`}>
            <img src={`${photo}?v=${Date.now()}`} alt="house" />
          </Link>
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
          
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="fa-solid fa-location-dot"></i> {city} - {location}
            </span>

            <span className='tour__rating d-flex align-items-center  gap-1'>
              <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>
              }
            </span>

          </div>

          {/* Title with link */}
          <h5 className="tour__title">
            <Link to={`/house/${_id}`}>{title}</Link>
          </h5>

          <div className="house__features d-flex align-items-center justify-content-between mt-2">
            <span><i className="fa-solid fa-bed"></i> {bedrooms} Bedrooms</span>
          </div>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${price} <span>/night</span></h5>

            {/* Button wrapped around <Link> is also invalid */}
            <Link to={`/house/${_id}`} className="btn booking__btn">
              View Details
            </Link>
          </div>
        </CardBody>
      </Card>
       </Link>
    </div>
  );
};

export default HouseCard;