import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import '../styles/tour-filter.css'

const BoatFilter = ({ onFilter }) => {
  const { t } = useTranslation()

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
    { value: 'Istanbul - Bosphorus', label: t('location') + ' İstanbul Boğazı' }, // مثال فقط
    { value: 'Antalya - Marina', label: t('location') + ' Antalya Marina' },
    { value: 'Bodrum - Marina', label: t('location') + ' Bodrum Marina' },
  ]

  const maxPassengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} ${i > 0 ? t('passengers') : t('passenger')}`
  }))

  const priceOptions = [
    { value: '500', label: `${t('under')} 500` },
    { value: '1000', label: `${t('under')} 1000` },
    { value: '1500', label: `${t('under')} 1500` },
    { value: '2000', label: `${t('under')} 2000` },
  ]

  const ratingOptions = [
    { value: 3, label: `3 ${t('starsAndUp')}` },
    { value: 4, label: `4 ${t('starsAndUp')}` },
    { value: 4.5, label: `4.5 ${t('starsAndUp')}` },
    { value: 5, label: `5 ${t('stars')}` },
  ]

  const featureOptions = [
    { value: 'meals_provided', label: t('meals_provided') || 'Meals Provided' }, // إذا ما عندك مفتاح هاي حط النص الإنجليزي
    { value: 'music_system', label: t('music_system') || 'Music System' },
    { value: 'wifi', label: t('wifi') || 'Wi-Fi' },
    { value: 'air_conditioned', label: t('air_conditioned') || 'Air Conditioned' },
    { value: 'tour_guide', label: t('tour_guide') || 'Tour Guide' },
    { value: 'outdoor_seating', label: t('outdoor_seating') || 'Outdoor Seating' },
    { value: 'swimming_allowed', label: t('swimming_allowed') || 'Swimming Allowed' },
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
    }
    setFilters(resetFilters)
    onFilter(resetFilters)
  }

  useEffect(() => {
    onFilter(filters)
  }, [filters])

  return (
    <div className="house-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>{t('location')}</label>
          <Select
            options={locationOptions}
            value={locationOptions.find(opt => opt.value === filters.location) || null}
            onChange={(selected) => handleChange('location', selected?.value || '')}
            isClearable
          />
        </Col>
        <Col lg="3" md="4">
          <label>{t('maxPassengers')}</label>
          <Select
            options={maxPassengerOptions}
            value={maxPassengerOptions.find(opt => opt.value === filters.maxPassengers) || null}
            onChange={(selected) => handleChange('maxPassengers', selected?.value || '')}
            isClearable
          />
        </Col>
        <Col lg="3" md="4">
          <label>{t('pricePerHour')}</label>
          <Select
            options={priceOptions}
            value={priceOptions.find(opt => opt.value === filters.pricePerHour) || null}
            onChange={(selected) => handleChange('pricePerHour', selected?.value || '')}
            isClearable
          />
        </Col>
        <Col lg="3" md="4">
          <label>{t('rating')}</label>
          <Select
            options={ratingOptions}
            value={ratingOptions.find(opt => opt.value === filters.rating) || null}
            onChange={(selected) => handleChange('rating', selected?.value || '')}
            isClearable
          />
        </Col>
        <Col lg="6" md="6">
          <label>{t('features')}</label>
          <Select
            options={featureOptions}
            value={featureOptions.filter(opt => filters.features.includes(opt.value)) || null}
            isMulti
            onChange={(selected) => handleChange('features', selected?.map(s => s.value) || [])}
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

export default BoatFilter
