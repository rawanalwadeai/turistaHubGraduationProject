import React, { useState , useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import '../styles/tour-filter.css'

const CarFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    fuelType: '',
    doors: '',
    seats: '',
    rentalPrice: '',
    transmission: '',
    condition: '',
    amenities: [],
  })


  
  const handleReset = () => {
    const resetFilters = {
      location: '',
      type: '',
      fuelType: '',
      doors: '',
      seats: '',
      rentalPrice: '',
      transmission: '',
      condition: '',
      amenities: [],
    };
    setFilters(resetFilters);
    onFilter(resetFilters);  // إرسال الفلاتر الفارغة للمكون الأب
  };


  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const handleApply = () => {
    onFilter(filters)
  }

  const locationOptions = [
    { value: 'Istanbul', label: 'Istanbul' },
    { value: 'Ankara', label: 'Ankara' },
    { value: 'Izmir', label: 'Izmir' },
    { value: 'Antalya', label: 'Antalya' },
  ]

  const typeOptions = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Luxury', label: 'Luxury' },
    { value: 'Electric', label: 'Electric' },
  ]

  const fuelTypeOptions = [
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Electric', label: 'Electric' },
  ]

  const doorsOptions = Array.from({ length: 5 }, (_, i) => i + 2).map(i => ({
    value: i, label: `${i} Door${i > 1 ? 's' : ''}`
  }))

  const seatsOptions = Array.from({ length: 6 }, (_, i) => i + 2).map(i => ({
    value: i, label: `${i} Seat${i > 1 ? 's' : ''}`
  }))

  const rentalPriceOptions = [
    { value: '25', label: 'Under 25' },
    { value: '50', label: 'Under 50' },
    { value: '100', label: 'Under 100' },
    { value: '150', label: 'Under 150' },
  ]

  const transmissionOptions = [
    { value: 'Automatic', label: 'Automatic' },
    { value: 'Manual', label: 'Manual' },
  ]

  const conditionOptions = [
    { value: 'New', label: 'New' },
    { value: 'Like New', label: 'Like New' },
    { value: 'Used', label: 'Used' },
  ]

  const amenitiesOptions = [
    { value: 'AC', label: 'Air Conditioning' },
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'GPS', label: 'GPS' },
    { value: 'Leather Seats', label: 'Leather Seats' },
    { value: 'Sunroof', label: 'Sunroof' },
  ]


    useEffect(() => {
  onFilter(filters)
    } , [filters])
  
  

    return (
      <div className="car-filter p-3 rounded shadow mb-4">
        <Row>
          <Col lg="3" md="4">
            <label>Location</label>
            <Select
              options={locationOptions}
              value={locationOptions.find(opt => opt.value === filters.location) || null}
              onChange={(selected) => handleChange('location', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Type</label>
            <Select
              options={typeOptions}
              value={typeOptions.find(opt => opt.value === filters.type) || null}
              onChange={(selected) => handleChange('type', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Fuel Type</label>
            <Select
              options={fuelTypeOptions}
              value={fuelTypeOptions.find(opt => opt.value === filters.fuelType) || null}
              onChange={(selected) => handleChange('fuelType', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Doors</label>
            <Select
              options={doorsOptions}
              value={doorsOptions.find(opt => opt.value === filters.doors) || null}
              onChange={(selected) => handleChange('doors', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Seats</label>
            <Select
              options={seatsOptions}
              value={seatsOptions.find(opt => opt.value === filters.seats) || null}
              onChange={(selected) => handleChange('seats', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Rental Price</label>
            <Select
              options={rentalPriceOptions}
              value={rentalPriceOptions.find(opt => opt.value === filters.rentalPrice) || null}
              onChange={(selected) => handleChange('rentalPrice', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Transmission</label>
            <Select
              options={transmissionOptions}
              value={transmissionOptions.find(opt => opt.value === filters.transmission) || null}
              onChange={(selected) => handleChange('transmission', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Condition</label>
            <Select
              options={conditionOptions}
              value={conditionOptions.find(opt => opt.value === filters.condition) || null}
              onChange={(selected) => handleChange('condition', selected?.value || '')}
              isClearable
            />
          </Col>
          <Col lg="3" md="4">
            <label>Amenities</label>
            <Select
              options={amenitiesOptions}
              value={amenitiesOptions.filter(opt => filters.amenities.includes(opt.value)) || null}
              isMulti
              onChange={(selected) => handleChange('amenities', selected.map(s => s.value))}
            />
          </Col>
          <Col lg="12" className="mt-3">
            <Button className="btn primary__btn" onClick={handleReset}>Clear Filters</Button>
          </Col>
        </Row>
      </div>
    )
  }    

export default CarFilter
