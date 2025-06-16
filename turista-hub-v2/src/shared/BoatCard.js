import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';

import calculateAvgRating from '../utils/avgRating';
import { useTranslation } from 'react-i18next';

const BoatCard = ({ boats }) => {
  const { t } = useTranslation();

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

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Link to={`/boats/${_id}`} className='tour__card-link'>
        <Card>
          <div className="tour__img">
            <img src={image_url} alt="boat" />
            {featured && <span>{t("featured")}</span>}
          </div>

          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i className="fa-solid fa-location-dot"></i> {location}
              </span>

              <span className='tour__rating d-flex align-items-center gap-1'>
                <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? t("notRated") : <span>({reviews.length})</span>}
              </span>
            </div>

          
            <h5 className="tour__title">
              {boat_name}
            </h5>

            
            <div className="tour__features d-flex align-items-center justify-content-between mt-2">
              <span>
                <i className="fa-solid fa-user-group"></i> {t("upToGuests", { count: max_passengers })}
              </span>
            </div>

            
            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>${price_per_hour} <span>/{t("perHour")}</span></h5>
             <button  className="btn booking__btn">
                {t("viewDetails")}
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default BoatCard;
