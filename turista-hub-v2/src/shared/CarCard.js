import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';
import { useTranslation } from 'react-i18next';

const CarCard = ({ car }) => {
  const { t } = useTranslation();

  const {
    _id,
    name,
    model,
    type,
    photo,
    price,
    featured,
    reviews,
    fuelType,
    transmission,
    location
  } = car;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='tour__card'>
      <Link to={`/car/${_id}`} className='tour__card-link'>
        <Card>
          <div className='tour__img'>
            <img src={photo} alt={name} />
            {featured && <span>{t("featured")}</span>}
          </div>

          <CardBody>
            <div className='card__top d-flex align-items-center justify-content-between'>
              <span className='tour__location d-flex align-items-center gap-1'>
                <i className="fa-solid fa-location-dot"></i> {location}
              </span>

              <span className='tour__rating d-flex align-items-center gap-1'>
                <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? t("notRated") : <span>({reviews.length})</span>}
              </span>
            </div>

            <h5 className='tour__title'>
              <Link to={`/car/${_id}`}>{model} {name}</Link>
            </h5>

            <div className='car__details mt-2'>
              <p><strong>{t("type")}:</strong> {type}</p>
              <p><strong>{t("fuel")}:</strong> {fuelType}</p>
              <p><strong>{t("transmission")}:</strong> {transmission}</p>
            </div>

            <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
              <h5>${price} <span>{t("perDay")}</span></h5>
              <button className='btn booking__btn'>
                <Link to={`/car/${_id}`}>{t("rentNow")}</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default CarCard;
