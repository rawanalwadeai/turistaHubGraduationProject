import React , {useRef} from 'react';
import './search-bar.css'
import {Col,Form ,FormGroup} from 'reactstrap';
import { BASE_URL } from '../utils/configB';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import { useTranslation } from 'react-i18next';
const SearchBar = () => {


    const {t} = useTranslation()
    const locationRef = useRef('')
    // const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)

    const navigate = useNavigate()

    const searchHandler = async () => {
        const location = locationRef.current.value.trim()
        // const distance = distanceRef.current.value
        // const maxGroupSize = maxGroupSizeRef.current.value
        
        // التحقق من صحة المدخلات
        // if(location === ''  || maxGroupSize === '') {
        //     return toast.info('All fields are required')
        // }
        
        // if(isNaN(distance) || distance <= 0) {
        //     return toast.error('Please enter a valid positive distance')
        // }
        
        // if(isNaN(maxGroupSize) || maxGroupSize <= 0) {
        //     return toast.error('Please enter a valid positive group size')
        // }

        // إجراء الطلب
        // const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}`)
                const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)

        if (!res.ok) {
            toast.error('Something went wrong while fetching data')
            return
        }
        
        const result = await res.json()
        // navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {state: result.data})
        navigate(`/tour/search`, { state: result.data })
    
    }

  return <Col lg='12'>
    <div className='search__bar'>
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span>
               <i className="fa-solid fa-location-dot"></i>
                </span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder={t('Searchbycity')}  ref={locationRef}/>
                </div>
            </FormGroup>

            {/* <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                <span>
               <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <div>
                    <h6>Distance</h6>
                    <input type="number" placeholder='Distance k/m'  ref={distanceRef}/>
                </div>
            </FormGroup> */}

            {/* <FormGroup className='d-flex gap-3 form__group form__group-last'>
                <span>
               <i className="fa-solid fa-user-group"></i>
                </span>
                <div>
                    <h6> people</h6>
                    <input type="number" placeholder='0' ref={maxGroupSizeRef}/>
                </div>
            </FormGroup> */}

            <span className='search__icon' type='submit' onClick={searchHandler}>
               <i className="fa-solid fa-magnifying-glass"></i>
            </span>
        </Form>
    </div>
  </Col>
}

export default SearchBar;