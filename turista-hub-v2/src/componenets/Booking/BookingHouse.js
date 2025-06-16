import React, { useState, useContext, useEffect } from 'react';
import './booing.css';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';  
import MyDatePicker from '../MyDatePicker';
const BookingHouse = ({ house, avgRating }) => {
  const { t } = useTranslation();  
  const { price, reviews, title } = house;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    userId: user && user._id,
    houseId: house && house._id,
    userEmail: user && user.email,
    fullName: '',
    placeName: title,
    phone: '',
    guestSize: 1,
    bookAt: '',
    bookEndAt: '',
    rentalDays:'1'
  });

  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/bookingHouse/unavailable/${house._id}`);
        const data = await res.json();
        const dates = data.map(dateStr => new Date(dateStr));
        setUnavailableDates(dates);
      } catch (error) {
        toast.error('errorLoadingDates');
      }
    };

    if (house && house._id) {
      fetchUnavailableDates();
    }
  }, [house]);



  // const handleChange = e => {
  //   setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const isDateUnavailable = (dateStr) => {
    const dateToCheck = new Date(dateStr).toDateString();
    return unavailableDates.some(date => new Date(date).toDateString() === dateToCheck);
  };
  const handleInputChange = e => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  };

  const handleStartDateChange = (date) => {
    if (isDateUnavailable(date)) {
      toast.error(t('dateUnavailable'));
      return;
    }
    setCredentials(prev => ({ ...prev, bookAt: date.toISOString() }));
  };

  const handleEndDateChange = (date) => {
    if (isDateUnavailable(date)) {
      toast.error(t('dateUnavailable'));
      return;
    }
    setCredentials(prev => ({ ...prev, bookEndAt: date.toISOString() }));
  };

useEffect(() => {
  if (credentials.bookAt && credentials.bookEndAt) {
    const diffDays = Math.max(
      1,
      Math.ceil(
        (new Date(credentials.bookEndAt) - new Date(credentials.bookAt)) / (1000 * 3600 * 24)
      )
    );
    setCredentials(prev => ({ ...prev, rentalDays: diffDays }));
  }
}, [credentials.bookAt, credentials.bookEndAt]);

  const serviceFee = 10;
const totalAmount = (Number(price) * Number(credentials.rentalDays)) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user) {
        return toast.error(t('pleaseSignIn'));
      }

      const res = await fetch(`${BASE_URL}/bookingHouse/${house._id}`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }

      // navigate('/thank-you');
      const bookingId = result.data._id
      navigate(`/payment/house/${bookingId}`)

    } catch (err) {

      toast.error(err.message);
    }
  };
  return (
    <div className='booking'>
      {/* Top section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span> / {t('perNight')}</span>
        </h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>{t('information')}</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder={t('fullName')} id='fullName' required onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder={t('phone')} id='phone' required onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder={t('guests')} id='guestSize' required onChange={handleInputChange} />
          </FormGroup>

          <FormGroup className='d-flex gap-3'>
            <MyDatePicker
              selected={credentials.bookAt ? new Date(credentials.bookAt) : null}
              onChange={handleStartDateChange}
              minDate={new Date()}
              placeholder={t('startDate')}
              excludeDates={unavailableDates}
            />

            <MyDatePicker
              selected={credentials.bookEndAt ? new Date(credentials.bookEndAt) : null}
              onChange={handleEndDateChange}
              minDate={credentials.bookAt ? new Date(new Date(credentials.bookAt).getTime() + 24 * 60 * 60 * 1000) : new Date()}
              placeholder={t('endDate0')}
              excludeDates={unavailableDates}
            />


          </FormGroup>
           <FormGroup>
                      <p>
                        <strong>{t('rentalDays')}:</strong> {credentials.rentalDays} {t('day')}
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
            <h5>{t('serviceCharge')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>{t('total')}</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          {t('book')}
        </Button>
      </div>
    </div>
  );
};

export default BookingHouse;
