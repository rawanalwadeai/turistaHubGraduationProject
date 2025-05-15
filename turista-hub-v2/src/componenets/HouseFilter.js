import React, { useState , useEffect} from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import '../styles/tour-filter.css'

const HouseFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    maxGroupSize: '',
    amenities: [],
  })

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  // const handleApply = () => {
  //   onFilter(filters)
  // }

  const handleReset = () => {
    const resetFilters = {
      city: '',
    type: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    maxGroupSize: '',
    amenities: [],
    };
    setFilters(resetFilters);
    onFilter(resetFilters);  // إرسال الفلاتر الفارغة للمكون الأب
  };

  const cityOptions = [
    { value: 'Istanbul', label: 'Istanbul' },
    { value: 'Ankara', label: 'Ankara' },
    { value: 'Sapanca', label: 'Sapanca' },
  ]

  const typeOptions = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Cottage', label: 'Cottage' },
    { value: 'Mountain House', label: 'Mountain House' },
    { value: 'Eco Cabin', label: 'Eco Cabin' },
    { value: 'Traditional House', label: 'Traditional House' },
  ]

  const priceOptions = [
    { value: '50', label: 'Under 50' },
    { value: '100', label: 'Under 100' },
    { value: '150', label: 'Under 150' },
    { value: '200', label: 'Under 200' },
  ]

  const bedroomOptions = Array.from({ length: 5 }, (_, i) => i + 1).map(i => ({
    value: i, label: `${i} Bedroom${i > 1 ? 's' : ''}`
  }))

  const bathroomOptions = Array.from({ length: 4 }, (_, i) => i + 1).map(i => ({
    value: i, label: `${i} Bathroom${i > 1 ? 's' : ''}`
  }))

  const amenitiesOptions = [
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'parking', label: 'Parking' },
    { value: 'pool', label: 'Pool' },
    { value: 'petsAllowed', label: 'Pets Allowed' },
    { value: 'elevator', label: 'Elevator' },
    { value: 'airConditioning', label: 'Air Conditioning' },
    { value: 'heating', label: 'Heating' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'laundry', label: 'Laundry' },
  ]


//عشان الفلتره الفوريه 
  useEffect(() => {
onFilter(filters)
  } , [filters])



  return (
    <div className="house-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>City</label>
          <Select
            options={cityOptions}
            value={cityOptions.find(option => option.value === filters.city) || null}
            onChange={(selected) => handleChange('city', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Type</label>
          <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === filters.type) || null}
            onChange={(selected) => handleChange('type', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Price</label>
          <Select
            options={priceOptions}
            value={priceOptions.find(option => option.value === filters.price) || null}
            onChange={(selected) => handleChange('price', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Bedrooms</label>
          <Select
            options={bedroomOptions}
            value={bedroomOptions.find(option => option.value === filters.bedrooms) || null}
            onChange={(selected) => handleChange('bedrooms', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Bathrooms</label>
          <Select
            options={bathroomOptions}
            value={bathroomOptions.find(option => option.value === filters.bathrooms) || null}
            onChange={(selected) => handleChange('bathrooms', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Max Group Size</label>
          <Select
            options={Array.from({ length: 6 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }))}
            value={
              filters.maxGroupSize
                ? { value: filters.maxGroupSize, label: `${filters.maxGroupSize}` }
                : null
            }
            onChange={(selected) => handleChange('maxGroupSize', selected?.value || '')}
            isClearable
          />
        </Col>
  
        <Col lg="3" md="4">
          <label>Amenities</label>
          <Select
            options={amenitiesOptions}
            isMulti
            value={
              Array.isArray(filters.amenities)
                ? amenitiesOptions.filter(option => filters.amenities.includes(option.value))
                : []
            }
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

export default HouseFilter
