import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'

import './tour-card.css'


import calculateAvgRating from '../utils/avgRating'


const TourCard = ({ tour }) => {

  const { _id, title, city, photo, price, featured, reviews ,tourDate } = tour

  const { totalRating, avgRating } = calculateAvgRating(reviews)


  return (
    <div className='tour__card'>
      <Link to={`/tour/${_id}`} className='tour__card-link'>
      <Card >
        <div className='tour__img'>
          <img src={`${photo}`} alt=" " />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className='card__top d-flex align-items-center justify-content-between'>
            <span className='tour__location d-flex align-items-center  gap-1'>
              <i className="fa-solid fa-location-dot"></i> {city}
            </span>

            <span className='tour__rating d-flex align-items-center  gap-1'>
              <i className="fa-solid fa-star"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>
              }
            </span>
          </div>


          <h5 className='tour__title'><Link to={`/tour/${_id}`}> {title}</Link></h5>
          {/* <h5 className='tour__title'> {tourDate}</h5> */}
          <span>
    <i className="fa-solid fa-calendar-days"></i>{' '}
    {new Date(tourDate).toLocaleDateString('en-CA')}
  </span>

          <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
            <h5>${price} <span> /per person</span></h5>

            <button className='btn booking__btn'>
              <Link to={`/tour/${_id}`}>Book now </Link>
            </button>
          </div>
        </CardBody>
      </Card>
      </Link>


    </div>
  )
}

export default TourCard