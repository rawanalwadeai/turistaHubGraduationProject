import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from "reactstrap";


import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'
import { useTranslation } from 'react-i18next'




const ServiceList = () => {

const {t} = useTranslation()
const servicesData = [

    {
      imgUrl: weatherImg,
      title: t('services.accommodationBooking.title'),
      desc: t('services.accommodationBooking.desc')
    },
    {
      imgUrl: guideImg,
      title: t('services.carRentalService.title'),
      desc: t('services.carRentalService.desc')
    },
    {
      imgUrl: customizationImg,
      title: t('services.tourGuideService.title'),
      desc: t('services.tourGuideService.desc')
    }
]
    return (
        <>
            {
            servicesData.map((item, index) => 
            <Col lg='3' md='6' sm='12'className='mb-4' key={index}>
              <  ServiceCard item={item} />
            </Col>)
            }

        </>
    )
}

export default ServiceList