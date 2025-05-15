import React, { use } from 'react'
import TourCard from '../../shared/TourCard'
import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from './../../hooks/useFetchA'
import {BASE_URL} from './../../utils/configB'

const FeaturedTourList = () => {



  //C 
  const {data: featuredTours , loading ,error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`) 
  console.log (featuredTours)
  

  return (
   <> 
   {
   
    loading && <h4>Loading............</h4>

   }
   {
    error && <h4>{error}</h4>
   }
   



{!loading && !error && featuredTours?.slice(0,4).map(tour =>(
        <Col lg='3' md='6' sm='6' className='mb-4' key={tour.id}>
            <TourCard tour={tour} />
        </Col>
    ))
   }
   
   </>
  )
}

export default FeaturedTourList