import React from 'react'
import BoatCard from '../../shared/BoatCard'
import { Col } from 'reactstrap'
import useFetch from './../../hooks/useFetchA'
import {BASE_URL} from './../../utils/configB'




const FeaturedBoatList = () => {
  
  const {data: featuredBoats, loading ,error} = useFetch(`${BASE_URL}/boats/featured/getFeaturedBoats`) 
  console.log('Featured Boats from API:', featuredBoats);  
  return (
   <>
   
   {
   
   loading && <h4>Loading............</h4>

  }
  {
   error && <h4>{error}</h4>
  }
  



{!loading && !error && featuredBoats?.slice(0,4).map(boats =>(
       <Col lg='3' md='6' sm='6' className='mb-4' key={boats.id}>
           <BoatCard boats={boats} />
       </Col>
   ))
  }
  
   
   </>
  )
}

export default FeaturedBoatList