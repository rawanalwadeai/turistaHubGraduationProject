import React, { useState, useContext } from 'react';
import './booing.css';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import MyDatePicker from '../MyDatePicker';

const BookingBoat = ({ boat, avgRating }) => {
  const { price_per_hour, reviews, boat_name, type } = boat;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

const [credentials, setCredentials] = useState({
  userId: user && user._id,
  boatId: boat && boat._id,
  userEmail: user && user.email,
  fullName: '',
  boatName: boat_name,
  phone: '',
  guestSize: 1,
  rentalHours: 1,
  bookingDate: '',
  startTime: '',
});
const [excludedTimes, setExcludedTimes] = useState([]);

const handleDateChange = async (date) => {
  const selectedDate = date.toISOString().split('T')[0]; // yyyy-mm-dd

  setCredentials((prev) => ({
    ...prev,
    bookingDate: selectedDate,
  }));

  try {
    const res = await fetch(`${BASE_URL}/bookingBoat/disabled-times/${boat._id}?date=${selectedDate}`);
    const data = await res.json();
    if (res.ok) {
      const disabled = data.disabledHours.map((hour) => {
        const d = new Date(date);
        d.setHours(hour, 0, 0, 0);
        return d;
      });
      setExcludedTimes(disabled);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    toast.error('Error loading disabled hours');
  }
};



const handleChange = (e) => {
  setCredentials((prev) => ({
    ...prev,
    [e.target.id]: e.target.value
  }));
};

  const serviceFee = 20; //  اغيره بعدين  
  const totalAmount =
    Number(price_per_hour) * Number(credentials.rentalHours || 1) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error(t('pleaseSignIn'));
    }

    try {
      const res = await fetch(`${BASE_URL}/bookingBoat/${boat._id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result.message);

   const bookingId = result.data._id
navigate(`/payment/boat/${bookingId}`)



} catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='booking'>
      {/* Top Section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price_per_hour} <span>/ {t('perHour')}</span>
        </h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className='booking__form'>
        <h5>{t('booking')}</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input
              type='text'
              placeholder={t('fullNamePlaceholder')}
              id='fullName'
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type='number'
              placeholder={t('phonePlaceholder')}
              id='phone'
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type='number'
              placeholder={t('guestPlaceholder')}
              id='guestSize'
              required
              onChange={handleChange}
            />
          </FormGroup>
         
      <FormGroup>
        <MyDatePicker
  selected={credentials.bookingDate ? new Date(credentials.bookingDate) : null}
  onChange={handleDateChange}
  minDate={new Date()}
  placeholder={t('bookingDate')}
/>

<MyDatePicker
  selected={
    credentials.bookingDate && credentials.startTime
      ? new Date(`${credentials.bookingDate}T${credentials.startTime}`)
      : null
  }
  onChange={(date) => {
    if (!credentials.bookingDate) {
      toast.error(t('pleaseSelectBookingDateFirst')); // رسالة: اختر التاريخ أولاً
      return;
    }
    const time = date.toTimeString().slice(0, 5); // hh:mm
    setCredentials((prev) => ({
      ...prev,
      startTime: time,
    }));
  }}
  minDate={
    credentials.bookingDate
      ? new Date(`${credentials.bookingDate}T00:00:00`)
      : null
  }
  placeholder={t('startTime')}
  excludeTimes={excludedTimes}
  showTime={true}
/>

</FormGroup>
          <FormGroup className='d-flex gap-3'>
            <input
              type='number'
              placeholder={t('rentalHoursPlaceholder')}
              id='rentalHours'
              required
              onChange={handleChange}
              min={1}
            />
          </FormGroup>


 

        </Form>
      </div>







      {/* Booking Summary */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5>{t('price')}</h5>
            <span>${price_per_hour}</span>
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
          {t('bookNow')}
        </Button>
      </div>
    </div>
  );
};

export default BookingBoat;
