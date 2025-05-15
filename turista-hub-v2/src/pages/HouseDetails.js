import React, { useRef, useState , useEffect , useContext } from 'react';
import '../styles/tour-details.css'; // استخدام نفس ملف الـ CSS
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import houseData from '../assets/data/houses.js'; // تأكد من وجود بيانات المنازل
import calculateAvgRating from '../utils/avgRating';

import avatar from '../assets/images/avatar.jpg';

import BookingHouse from '../componenets/Booking/BookingHouse.js';


import useFetchA from '../hooks/useFetchA.js';
import { BASE_URL } from '../utils/configB.js';




import {AuthContext} from './../context/AuthContext'
import { toast } from 'react-toastify';




const HouseDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef('');
  const [houseRating, setHouseRating] = useState(null);


  const {user} = useContext(AuthContext)


  // هذا البيانات مؤقتة، لاحقًا سنستدعي الـ API لتحميل البيانات من قاعدة البيانات
  // const house = houseData.find(house => house.id === id);
  const {data:house , loading , error} = useFetchA(`${BASE_URL}/houses/${id}`)

  // تفكيك الخصائص من house
  const { photo, title, desc, price, address, reviews, city, maxGroupSize, bedrooms, bathrooms, area } = house || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // تنسيق التاريخ
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // إرسال الطلب إلى الخادم
  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    // هنا يمكن إضافة الاتصال بالـ API لاحقاً



  
  //L
  try{
  
  
    if(!user)
      {toast.error('Please sign in')}
  
  
    const reviewObj = { 
       productType: 'House',
       productId: id,
      username:user?.username,
    reviewText,
    rating:houseRating,
    }
  
    const res =  await fetch(`${BASE_URL}/reviews/houses/${id}` , {
      
      method:'post',
    headers:{
      'content-type' : 'application/json'
    
    }, 
  credentials:'include',
  body: JSON.stringify(reviewObj)
  
  })
  
  const result = await res.json()
  if(!res.ok) {
     return toast.error(result.message)}
  
     toast.success(result.message) //?
  
  }catch(err){
    toast.error(err.message)
  
  }
  };


  useEffect(() => { 
    window.scrollTo(0,0)
  } , [house])
  
  return (
    <>
      <section>
        <Container>
        {
            loading && <h4 className='text-center pt-5'>Loading..........</h4>
          }
          {
                        error && <h4 className='text-center pt-5'>{error}</h4>

          }
          {
            !loading && !error &&  <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />

                <div className="tour__info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="fa-solid fa-star" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
                    </span>

                    <span>
                      <i className="fa-solid fa-location-dot"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="fa-solid fa-map-pin"></i> {city}</span>
                    <span><i className="fa-solid fa-turkish-lira-sign"></i>${price} / per night</span>
                    {/* <span><i className="fa-solid fa-clock"></i} km</span> */}
                    <span><i className="fa-solid fa-user-group"></i> {maxGroupSize} people</span>
                    
                    
                    <span><i className="fa-solid fa-bed"></i> {bedrooms} Bedrooms</span>
                    <span><i className="fa-solid fa-bath"></i> {bathrooms} Bathrooms</span>
                    <span><i className="fa-solid fa-ruler-combined"></i> {area}</span>

                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/************** *************** house reviews section start ************************/}
                <div className="tour__reviews mt-4">
                   <h4>Reviews ( {reviews?.length}  reviews)</h4>
                
                
                
                                  <Form onSubmit={submitHandler}>
                                    <div className="d-flex align-items-center  gap-3 mb-4 rating__group">
                
                
                
                                    {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setHouseRating(star)}
                    className={houseRating >= star ? 'active' : ''}
                  >
                    <i className="fa-solid fa-star"></i>
                  </span>
                ))}
                
                                      
                
                                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                      <button className="btn primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review.id}>
                        <img src={avatar} alt={review.name} />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.userName}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                            </div>

                            <span className="d-flex align-items-center">
                              {review.rating} <i className="fa-solid fa-star"></i>
                            </span>
                          </div>

                          {/* <h6>{review.title}</h6> */}
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/************** *************** house reviews section end ************************/}
              </div>
            </Col>

            <Col lg="4">
              <BookingHouse house={house} />
            </Col>
          </Row>
          }


         
        </Container>
      </section>
    </>
  );
};

export default HouseDetails;
