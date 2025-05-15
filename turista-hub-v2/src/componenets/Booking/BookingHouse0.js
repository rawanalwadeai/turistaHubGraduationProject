import React, { useState } from 'react';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './booing.css'; 

const BookingHouse = ({ house , avgRating}) => {
  const { price, reviews , title } = house;

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: 'user && user._id',
    userEmail: 'user && user.email',
    fullName: '',
    placeName: title ,
    phone: '',
    guestSize: 1,
    bookAt: '',
    bookEndAt: '',
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) + Number(serviceFee);

  // send data to server (مؤقتًا مجرد تنقل لصفحة الشكر)
  const handleClick = e => {
    e.preventDefault();
    console.log(credentials);
    navigate("/thank-you");
  };

  return (
    <div className='booking'>
      {/* Top section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>${price} <span> / per night</span></h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className="fa-solid fa-star" style={{ color: "var(--secondary-color)" }}></i> 
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
                     
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder='Full Name' id='fullName' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>

          <FormGroup className='d-flex align-items-center gap-3'>
            <input type='date' id='bookAt' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder='Guests' id='guestSize' required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>

      {/* Booking bottom */}
      <div className='booking__bottom'>
        <ListGroup>
         

          <ListGroupItem className='border-0 px-0'>
            <h5>Price</h5>
            <span>${price}</span>
          </ListGroupItem>


          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          Book 
        </Button>
      </div>
    </div>
  );
};

export default BookingHouse;
