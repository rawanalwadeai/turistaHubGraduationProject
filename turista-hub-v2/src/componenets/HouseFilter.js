import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import '../styles/tour-filter.css'

const HouseFilter = ({ onFilter }) => {
  const { t } = useTranslation()

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

  const handleReset = () => {
    const resetFilters = {
      city: '',
      type: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      maxGroupSize: '',
      amenities: [],
    }
    setFilters(resetFilters)
    onFilter(resetFilters)
  }

  const cityOptions = [
    { value: 'Istanbul', label: t('Istanbul') },
    { value: 'Ankara', label: t('Ankara') },
    { value: 'Sapanca', label: t('Sapanca') },
  ]

  const typeOptions = [
    { value: 'Apartment', label: t('Apartment') },
    { value: 'Villa', label: t('Villa') },
    { value: 'Cottage', label: t('Cottage') },
    { value: 'Mountain House', label: t('Mountain House') },
    { value: 'Eco Cabin', label: t('Eco Cabin') },
    { value: 'Traditional House', label: t('Traditional House') },
  ]

  const priceOptions = [
    { value: '50', label: t('Under 50') },
    { value: '100', label: t('Under 100') },
    { value: '150', label: t('Under 150') },
    { value: '200', label: t('Under 200') },
  ]

  const bedroomOptions = Array.from({ length: 5 }, (_, i) => i + 1).map(i => ({
    value: i,
    label: i > 1 ? `${i} ${t('Bedrooms')}` : `${i} ${t('Bedroom')}`,
  }))

  const bathroomOptions = Array.from({ length: 4 }, (_, i) => i + 1).map(i => ({
    value: i,
    label: i > 1 ? `${i} ${t('Bathrooms')}` : `${i} ${t('Bathroom')}`,
  }))

  const amenitiesOptions = [
    { value: 'wifi', label: t('wifi') },
    { value: 'parking', label: t('parking') },
    { value: 'pool', label: t('pool') },
    { value: 'petsAllowed', label: t('petsAllowed') },
    { value: 'elevator', label: t('elevator') },
    { value: 'airConditioning', label: t('airConditioning') },
    { value: 'heating', label: t('heating') },
    { value: 'kitchen', label: t('kitchen') },
    { value: 'laundry', label: t('laundry') },
  ]

  useEffect(() => {
    onFilter(filters)
  }, [filters])

  return (
    <div className="house-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>{t('city')}</label>
          <Select
            options={cityOptions}
            value={cityOptions.find(option => option.value === filters.city) || null}
            onChange={selected => handleChange('city', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('type')}</label>
          <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === filters.type) || null}
            onChange={selected => handleChange('type', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('price')}</label>
          <Select
            options={priceOptions}
            value={priceOptions.find(option => option.value === filters.price) || null}
            onChange={selected => handleChange('price', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('bedrooms')}</label>
          <Select
            options={bedroomOptions}
            value={bedroomOptions.find(option => option.value === filters.bedrooms) || null}
            onChange={selected => handleChange('bedrooms', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('bathrooms')}</label>
          <Select
            options={bathroomOptions}
            value={bathroomOptions.find(option => option.value === filters.bathrooms) || null}
            onChange={selected => handleChange('bathrooms', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('maxGroupSize')}</label>
          <Select
            options={Array.from({ length: 6 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }))}
            value={
              filters.maxGroupSize
                ? { value: filters.maxGroupSize, label: `${filters.maxGroupSize}` }
                : null
            }
            onChange={selected => handleChange('maxGroupSize', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('amenities')}</label>
          <Select
            options={amenitiesOptions}
            isMulti
            value={
              Array.isArray(filters.amenities)
                ? amenitiesOptions.filter(option => filters.amenities.includes(option.value))
                : []
            }
            onChange={selected => handleChange('amenities', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="12" className="mt-3">
          <Button className="btn primary__btn" onClick={handleReset}>
            {t('clearFilters')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default HouseFilter
