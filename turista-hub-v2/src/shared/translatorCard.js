import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './tour-card.css';
import calculateAvgRating from '../utils/avgRating';

const TranslatorCard = ({ translator }) => {
  const { t } = useTranslation();

  const {
    _id,
    name,
    city,
    gender,
    price,
    featured,
    reviews,
    languages,
    type,
    availableDays,
    photo
  } = translator;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='tour__card'>
      <Link to={`/translator/${_id}`} className='tour__card-link'>
        <Card>
          <img className='translator-avatar' src={photo} alt='avatar' />
          <CardBody>
            <div className='card__top d-flex align-items-center justify-content-between'>
              <span className='tour__location d-flex align-items-center gap-1'>
                <i className="fa-solid fa-user"></i> {t(gender)}
              </span>

              <span className='tour__rating d-flex align-items-center gap-1'>
                <i className="fa-solid fa-star"></i>
                {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? t('notRated') : <span>({reviews.length})</span>}
              </span>
            </div>

            {featured && <span className='featured-badge'>{t('featured')}</span>}

            <h5 className='tour__title'>
              <Link to={`/translator/${_id}`}>{name}</Link>
            </h5>

            <span className='tour__location d-flex align-items-center gap-1'>
              <i className="fa-solid fa-map-pin"></i> {city}
            </span>

            <div className='translator__details mt-2'>
              <p><strong>{t('type')}:</strong> {t(type)}</p>
              <p><strong>{t('languages')}:</strong> {languages?.map(lang => t(lang)).join(', ')}</p>
              <p><strong>{t('availableDays')}:</strong> {availableDays?.map(day => t(day)).join(', ')}</p>
            </div>

            <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
              <h5>${price} <span>{t('perDay')}</span></h5>

              <button className='btn booking__btn'>
                <Link to={`/translator/${_id}`}>{t('bookNow')}</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default TranslatorCard;
