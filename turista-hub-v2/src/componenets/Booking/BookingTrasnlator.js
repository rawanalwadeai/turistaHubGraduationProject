import React, { useState, useContext } from 'react'
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/configB'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import './booing.css'


const BookingTranslator = ({ translator, avgRating }) => {
  const { pricePerHour, reviews, name } = translator
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { t } = useTranslation()

  const [booking, setBooking] = useState({
    userId: user && user._id,
     translatorId: translator && translator._id,
    userEmail: user && user.email,
    translatorName: name,
    fullName: '',
    phone: '',
   
  })

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const serviceFee = 10
 
  const totalAmount =  Number(serviceFee)

  const handleClick = async e => {
    e.preventDefault()
    try {
      if (!user) {
        return toast.error(t('pleaseSignIn'))
      }

      const res = await fetch(`${BASE_URL}/bookingTranslator/${translator._id}`, {
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


     const bookingId = result.data._id
navigate(`/thank`)



    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>${pricePerHour} <span>/{t('perHour')}</span></h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className="fa-solid fa-star" style={{ color: "var(--secondary-color)" }}></i> 
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className='booking__form'>
        <h5>{t('information')}</h5>
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

          {/* <FormGroup>
            <input 
              type='number' 
              placeholder={t('guestPlaceholder')} 
              id='guestSize' 
              required 
              onChange={handleChange} 
            />
          </FormGroup> */}
        </Form>
      </div>

      <div className='booking__bottom'>
        {/* <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center'>
              ${price} <i className="fa-solid fa-xmark"></i> {booking.guestSize} person
            </h5>
            <span>${guestsPrice}</span>
          </ListGroupItem> */}

          {/* <ListGroupItem className='border-0 px-0'>
            <h5>{t('serviceCharge')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>{t('total')}</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup> */}

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          {t('request')}
        </Button>
      </div>
    </div>
  )
}

export default BookingTranslator
