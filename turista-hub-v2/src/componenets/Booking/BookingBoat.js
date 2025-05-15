import React, { useState, useContext } from 'react';
import './booing.css';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';

const BookingBoat = ({ boat, avgRating }) => {
  const { price_per_hour, reviews, 
    boat_name, type } = boat;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    fullName: '',
    boatName: boat_name,
    phone: '',
    guestSize: 1,
    // boatType: type || '', // نوع البوت إن وجد
    // bookStartAt: '',
    // bookEndAt: ''
    rentalHours :1

  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 20; // يمكن تغيره حسب سياسة البوت
  const totalAmount = Number(price_per_hour) * Number(credentials.rentalHours || 1) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error('Please sign in to book');
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

      console.log(res)

      const result = await res.json();
      if (!res.ok) return toast.error(result.message);

      navigate('/thank-you');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='booking'>
      {/* Top Section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>${price_per_hour} <span>/ per hour</span></h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className='booking__form'>
        <h5> Booking</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder='Full Name' id='fullName' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder='Number of Guests' id='guestSize' required onChange={handleChange} />
          </FormGroup>

          {/* <FormGroup>
            <select id='boatType' onChange={handleChange} required>
              <option value=''>Select Boat Type</option>
              <option value='yacht'>Yacht</option>
              <option value='fishing'>Fishing Boat</option>
              <option value='sailing'>Sailing Boat</option>
              <option value='speed'>Speed Boat</option>
            </select>
          </FormGroup> */}

          <FormGroup className='d-flex gap-3'>
            <input type='number' placeholder='Number of Rental hours' id='rentalHours' required onChange={handleChange} min={1} /> 
            </FormGroup>
        </Form>
      </div>

      {/* Booking Summary */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5>Price</h5>
            <span>${price_per_hour}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>Service Fee</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookingBoat;
