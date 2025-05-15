import React, { useState, useContext } from 'react'

import './booing.css'
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate, } from 'react-router-dom'

//M
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/configB'
import { toast } from 'react-toastify'





const Booking = ({ tour, avgRating }) => {



  const { price, reviews, title } = tour


  const navigate = useNavigate()


  //M
  const { user } = useContext(AuthContext)


  //M غيرت من credentials الى بوكنج
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''

  })

  const handleChange = e => {

    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }



  const serviceFee = 10
  const guestsPrice = Number(price) *( Number(booking.guestSize || 1))
  const totalAmount = guestsPrice + Number(serviceFee)

  //    send data to server
  const handleClick = async e => {
    e.preventDefault()



    //M
    console.log(booking)

    //M
    try {


      if (!user) { return toast.error('Please sign in') }

      console.log(tour)
      console.log(tour._id)

      const res = await fetch(`${BASE_URL}/bookingTour/${tour._id}`, {

        method: 'post',
        headers: {
          'content-type': 'application/json'
        },

        credentials: 'include',
        body: JSON.stringify(booking)


      })

      const result = await res.json()

      if (!res.ok) {
        return toast.info(result.message)
      }

      navigate("/thank-you")

    } catch (err) {
      toast.error(err.message)

    }

    // console.log(credentials);
  }


  return (


    <div className='booking'>

      <div className='booking__top d-flex align-items-center justify-content-between'>

        <h3>${price} <span> /per person</span></h3>


        <span className='tour__rating d-flex align-items-center  gap-1'>
          <i className="fa-solid fa-star" style={{ 'color': "var(--secondary-color)" }}>
          </i> {avgRating === 0 ? null : avgRating} ({reviews?.length})

        </span>
      </div>




      {/************************ booking form  */}


      <div className='booking__form'>
        <h5 >Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder='Full Name ' id='fullName' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>



          <FormGroup>
            <input type='number' placeholder=' Guest' id='guestSize' required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>



      {/************************ booking end  */}



      {/************************ booking bottom  */}
      <div className='booking__bottom'>

        <ListGroup>
          <ListGroupItem className='border-0  px-0 '>
            <h5 className='d-flex align-items-center'>${price} <i className="fa-solid fa-xmark"></i> {booking.guestSize}person  </h5>
            <span>${guestsPrice}</span>
          </ListGroupItem>


          <ListGroupItem className='border-0  px-0 '>
            <h5>Service charge </h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0  px-0  total'>
            <h5>Total  </h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>



        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}> Book Now</Button>
      </div>



    </div>
  )
}

export default Booking