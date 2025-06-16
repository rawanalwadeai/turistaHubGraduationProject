import React , {useRef} from 'react';
import './search-bar.css'
import {Col,Form ,FormGroup} from 'reactstrap';
import { toast } from 'react-toastify';

const SearchBarHouse = () => {

    const districtRef = useRef('')
    const roomsRef = useRef(0)
    const propertyTypeRef = useRef('')
    const startDateRef = useRef('')
    const endDateRef = useRef('')

    const searchHandler = () => {
        const district = districtRef.current.value
        const rooms = roomsRef.current.value
        const propertyType = propertyTypeRef.current.value
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value
        
        if(district === '' || rooms === '' || propertyType === '' || startDate === '' || endDate === '') {
            return toast.info('All fields are required')
        }

        // التحقق من أن تاريخ البدء ليس بعد تاريخ الانتهاء
        if (new Date(startDate) > new Date(endDate)) {
            return toast.error('Start date cannot be later than end date.')
        }
        
    }

    return <Col lg='12'>
        <div className='search__bar'>
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="fa-solid fa-city"></i>
                    </span>
                    <div>
                        <h6>District</h6>
                        <input type="text" placeholder='Enter district' ref={districtRef}/>
                    </div>
                </FormGroup>

                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="fa-solid fa-bed"></i>
                    </span>
                    <div>
                        <h6>Rooms</h6>
                        <input type="number" placeholder='0' ref={roomsRef}/>
                    </div>
                </FormGroup>

                {/* نوع العقار - باستخدام أزرار اختيار
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="fa-solid fa-house"></i>
                    </span>
                    <div>
                        <h6>Property Type</h6>
                        <div className="property-type-options">
                            <label>
                                <input 
                                    type="radio" 
                                    name="propertyType" 
                                    value="hotel" 
                                    ref={propertyTypeRef} 
                                /> Hotel
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="propertyType" 
                                    value="villa" 
                                    ref={propertyTypeRef} 
                                /> Villa
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="propertyType" 
                                    value="cottage" 
                                    ref={propertyTypeRef} 
                                /> Cottage
                            </label>
                        </div>
                    </div>
                </FormGroup> */}

                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                    <i className="fa-solid fa-calendar-day"></i>
                    </span>
                    <div>
                        <h6>Booking Period</h6>
                        <div className="d-flex gap-3">
                            <input type="date" placeholder="Start Date" ref={startDateRef} />
                            <input type="date" placeholder="End Date" ref={endDateRef} />
                        </div>
                    </div>
                </FormGroup>

                <span className='search__icon' type='submit' onClick={searchHandler}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
            </Form>
        </div>
    </Col>
}

export default SearchBarHouse;
