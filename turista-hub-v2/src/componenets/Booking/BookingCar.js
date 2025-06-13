import React, { useState, useContext , useEffect } from 'react';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';


import MyDatePicker from '../MyDatePicker';
const BookingCar = ({ car, avgRating }) => {
  const { price, reviews , title } = car;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const [booking, setBooking] = useState({
    userId: user && user._id,
    // carId: car && car._id,
    userEmail: user && user.email,
    carId: car._id,
    fullName: '',
    phone: '',
    rentalDays: 1,
    pickupDate: '',
    endDate: '',
    carTitle: title,
    
  });

    const [unavailableDates, setUnavailableDates] = useState([]);
  

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/bookingCar/unavailable/${car._id}`);
        const data = await res.json();
        const dates = data.map(dateStr => new Date(dateStr));
        setUnavailableDates(dates);
      } catch (error) {
        toast.error('errorLoadingDates');
      }
    };

    if (car && car._id) {
      fetchUnavailableDates();
    }
  }, [car]);
 

  useEffect(() => {
  if (booking.pickupDate && booking.endDate) {
    const diffDays = Math.max(
      1,
      Math.ceil(
        (new Date(booking.endDate) - new Date(booking.pickupDate)) / (1000 * 3600 * 24)
      )
    );
    setBooking(prev => ({ ...prev, rentalDays: diffDays }));
  }
}, [booking.pickupDate, booking.endDate]);



  const isDateUnavailable = (dateStr) => {
    const dateToCheck = new Date(dateStr).toDateString();
    return unavailableDates.some(date => new Date(date).toDateString() === dateToCheck);
  };
  const handleInputChange = e => {
    const { id, value } = e.target;
    setBooking(prev => ({ ...prev, [id]: value }));
  };
  const handleStartDateChange = (date) => {
  if (isDateUnavailable(date)) {
    toast.error(t('dateUnavailable'));
    return;
  }
  setBooking(prev => ({ ...prev, pickupDate: date.toISOString() }));
};

const handleEndDateChange = (date) => {
  if (isDateUnavailable(date)) {
    toast.error(t('dateUnavailable'));
    return;
  }
  setBooking(prev => ({ ...prev, endDate: date.toISOString() }));
};


  const serviceFee = 15;
  const totalAmount = Number(price) * Number(booking.rentalDays) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user) {
        return toast.error(t('pleaseSignIn'));
      }

      const res = await fetch(`${BASE_URL}/bookingCar/${car._id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

   const bookingId = result.data._id
// ✅ استخدمي bookingId للتنقل إلى صفحة الدفع
navigate(`/payment/car/${bookingId}`)



} catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='booking'>
      {/* Top section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span>{t('perDay')}</span>
        </h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>{' '}
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>{t('rentalInformation')}</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input
              type='text'
              placeholder={t('fullNamePlaceholder')}
              id='fullName'
              required
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type='number'
              placeholder={t('phonePlaceholder')}
              id='phone'
              required
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup className='d-flex gap-3'>
         <MyDatePicker
  selected={booking.pickupDate ? new Date(booking.pickupDate) : null}
  onChange={handleStartDateChange}
  minDate={new Date()}
  placeholder={t('startDate')}
  excludeDates={unavailableDates}
/>

<MyDatePicker
  selected={booking.endDate ? new Date(booking.endDate) : null}
  onChange={handleEndDateChange}
  minDate={booking.pickupDate ? new Date(new Date(booking.pickupDate).getTime() + 24 * 60 * 60 * 1000) : new Date()}
  placeholder={t('endDate')}
  excludeDates={unavailableDates}
/>

          
          </FormGroup>

          <FormGroup>
            <p>
              <strong>{t('rentalDays')}:</strong> {booking.rentalDays} {t('day')}
            </p>
          </FormGroup>




         

        </Form>
      </div>

      {/* Booking bottom */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5>{t('price')}</h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>{t('serviceFee')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>{t('total')}</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          {t('bookCar')}
        </Button>
      </div>
    </div>
  );
};

export default BookingCar;
