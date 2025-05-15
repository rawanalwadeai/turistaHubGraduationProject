import React, { useState  , useEffect} from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import '../styles/tour-filter.css'

const BoatFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    maxPassengers: '',
    pricePerHour: '',
    rating: '',
    features: []
  })

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const locationOptions = [
    { value: 'Istanbul - Bosphorus', label: 'Istanbul - Bosphorus' },
    { value: 'Antalya - Marina', label: 'Antalya - Marina' },
    { value: 'Bodrum - Marina', label: 'Bodrum - Marina' },
  ]

  const maxPassengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1, label: `${i + 1} Passenger${i > 0 ? 's' : ''}`
  }))

  const priceOptions = [
    { value: '500', label: 'Under 500' },
    { value: '1000', label: 'Under 1000' },
    { value: '1500', label: 'Under 1500' },
    { value: '2000', label: 'Under 2000' },
  ]

  const ratingOptions = [
    { value: 3, label: '3 stars & up' },
    { value: 4, label: '4 stars & up' },
    { value: 4.5, label: '4.5 stars & up' },
    { value: 5, label: '5 stars' },
  ]

  const featureOptions = [
    { value: 'meals_provided', label: 'Meals Provided' },
    { value: 'music_system', label: 'Music System' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'air_conditioned', label: 'Air Conditioned' },
    { value: 'tour_guide', label: 'Tour Guide' },
    { value: 'outdoor_seating', label: 'Outdoor Seating' },
    { value: 'swimming_allowed', label: 'Swimming Allowed' },
  ]

  const handleApply = () => {
    onFilter(filters)
  }

  const handleReset = () => {

    const resetFilters = {
      location: '',
      maxPassengers: '',
      pricePerHour: '',
      rating: '',
      features: []
     
    };
    setFilters(resetFilters);
    onFilter(resetFilters);  // إرسال الفلاتر الفارغة للمكون الأب
  };

  useEffect(() => {
    onFilter(filters)
      } , [filters])
    
    
      return (
        <div className="house-filter p-3 rounded shadow mb-4">
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
              <label>Max Passengers</label>
              <Select
                options={maxPassengerOptions}
                value={maxPassengerOptions.find(opt => opt.value === filters.maxPassengers) || null}
                onChange={(selected) => handleChange('maxPassengers', selected?.value || '')}
                isClearable
              />
            </Col>
            <Col lg="3" md="4">
              <label>Price / Hour</label>
              <Select
                options={priceOptions}
                value={priceOptions.find(opt => opt.value === filters.pricePerHour) || null}
                onChange={(selected) => handleChange('pricePerHour', selected?.value || '')}
                isClearable
              />
            </Col>
            <Col lg="3" md="4">
              <label>Rating</label>
              <Select
                options={ratingOptions}
                value={ratingOptions.find(opt => opt.value === filters.rating) || null}
                onChange={(selected) => handleChange('rating', selected?.value || '')}
                isClearable
              />
            </Col>
            <Col lg="6" md="6">
              <label>Features</label>
              <Select
                options={featureOptions}
                value={featureOptions.filter(opt => filters.features.includes(opt.value)) || null}
                isMulti
                onChange={(selected) => handleChange('features', selected?.map(s => s.value) || [])}
              />
            </Col>
            <Col lg="12" className="mt-3">
              <Button className="btn primary__btn" onClick={handleReset}>Clear Filters</Button>
            </Col>
          </Row>
        </div>
      )
      
}

export default BoatFilter
