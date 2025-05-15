import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from "reactstrap";


import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'


const servicesData = [
    {
        imgUrl: weatherImg,
        title: ' Accommodation Booking',
        desc: "We offer comfortable hotel options tailored to your needs."
    },
    {
        imgUrl: guideImg,
        title: '  Car Rental Service',
        desc: " Reliable and comfortable car rental options to make your trip easier."
    },
    {
        imgUrl: customizationImg,
        title: ' Tour & Guide Service',
        desc: "Unforgettable tour and travel experiences with professional guides."
    },
]



const ServiceList = () => {
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