import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonial = () => {


const settings = {
    dots:true,
    infinite:true,
    autoplay:true,
    speed:1000,
    swipeToSlide:true,
    autoplaySpeed:2000,
    slidesToShow:3,



    responsive:[
        {
            breakpoint:992,
            settings: {
                slidesToShow:2,
                slidesToScroll:1,
                infinite:true,
                dots:true,
            },
        },
        {
            breakpoint:576,
            settings: {
                slidesToShow:1,
                slidesToScroll:1,
               
            },
        },
    ]
}



  return <Slider {... settings}>


    <div className='testimonial py-4 px-3'>
        <p>lorem si tha mebu bfueh cueh ndcuwhbcb ubdue niwoe ihwo</p>
      
      <div className='d-flex align-items-center gap-4 mt-3'>
        <img className='w-25 h-25 rounded-2' src={ava01} alt=''/>
      </div>

<h5 className='mb-0 mt-3'>Muhammed</h5>
<p>Customer</p>
        </div> 



        <div className='testimonial py-4 px-3'>
        <p>lorem si tha mebu bfueh cueh ndcuwhbcb ubdue niwoe ihwo</p>
      
      <div className='d-flex align-items-center gap-4 mt-3'>
        <img className='w-25 h-25 rounded-2' src={ava02} alt=''/>
      </div>



<h5 className='mb-0 mt-3'>Rawan</h5>
<p>Customer</p>
        </div> 


        <div className='testimonial py-4 px-3'>
        <p>lorem si tha mebu bfueh cueh ndcuwhbcb ubdue niwoe ihwo</p>
      
      <div className='d-flex align-items-center gap-4 mt-3'>
        <img className='w-25 h-25 rounded-2' src={ava03} alt=''/>
      </div>

<h5 className='mb-0 mt-3'> Ahmed</h5>
<p>Customer</p>
        </div> 
  </Slider>

}

export default Testimonial