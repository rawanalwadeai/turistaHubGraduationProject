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

    const navigate = useNavigate()

    const searchHandler = async () => {
        const location = locationRef.current.value.trim()
                  const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)

        if (!res.ok) {
            toast.error('Something went wrong while fetching data')
            return
        }
        
        const result = await res.json()
        navigate(`/tour/search`, { state: result.data })
    
    }
    const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();  
    searchHandler();
  }
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
                    <input type="text" 
                    placeholder={t('Searchbycity')} 
                     ref={locationRef}
                     onKeyDown={handleKeyDown}/>
                </div>
            </FormGroup>

            

            <span className='search__icon' type='submit' onClick={searchHandler}>
               <i className="fa-solid fa-magnifying-glass"></i>
            </span>
        </Form>
    </div>
  </Col>
}

export default SearchBar;