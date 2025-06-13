import React, { use } from 'react'
import TourCard from '../../shared/TourCard'
import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from './../../hooks/useFetchA'
import {BASE_URL} from './../../utils/configB'
import { useTranslation } from 'react-i18next'

const FeaturedTourList = () => {

const {t} = useTranslation()

  //C 
  const {data: featuredTours , loading ,error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`) 
  

  return (
   <> 
   {
   
    loading && <h4>{t('loading')}</h4>

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