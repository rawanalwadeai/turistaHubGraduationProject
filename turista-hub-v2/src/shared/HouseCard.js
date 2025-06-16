import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';
import { useTranslation } from 'react-i18next';

const HouseCard = ({ house }) => {
  const { t } = useTranslation();

  const { _id, title, city, location, bedrooms, photo, price, reviews } = house;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card">
      <Link to={`/house/${_id}`} className='tour__card-link'>
        <Card>
          <div className="tour__img">
          
              <img src={`${photo}?v=${Date.now()}`} alt="house" />
        
          </div>

          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i className="fa-solid fa-location-dot"></i> {city} - {location}
              </span>

              <span className='tour__rating d-flex align-items-center gap-1'>
                <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? t("notRated") : <span>({reviews.length})</span>}
              </span>
            </div>

            <h5 className="tour__title">
           {title}
            </h5>

            <div className="house__features d-flex align-items-center justify-content-between mt-2">
              <span><i className="fa-solid fa-bed"></i> {bedrooms} {t("bedrooms")}</span>
            </div>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>${price} <span>{t("perNight")}</span></h5>

             <button className="btn booking__btn">
                {t("viewDetails")}
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default HouseCard;
