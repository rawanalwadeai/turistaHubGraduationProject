import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next' // استيراد هوك الترجمة
import '../styles/tour-filter.css'

const TranslatorFilter = ({ onFilter }) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState({
    city: '',
    languages: [],
    expertiseLevel: '',
    pricePerHour: '',
    rating: 0,
    reviewsCount: 0,
    availability: [],
    specializations: [],
  })

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const cityOptions = [
    { value: 'Istanbul', label: 'Istanbul' },
    { value: 'Cappadocia', label: 'Cappadocia' },
    { value: 'Izmir', label: 'Izmir' },
    { value: 'Bodrum', label: 'Bodrum' },
  ]

  const languageOptions = [
    { value: 'English', label: t('English') || 'English' },
    { value: 'Turkish', label: t('Turkish') || 'Turkish' },
    { value: 'Arabic', label: t('Arabic') || 'Arabic' },
    { value: 'French', label: t('French') || 'French' },
  ]

  const expertiseOptions = [
    { value: 'Beginner', label: t('Beginner') },
    { value: 'Intermediate', label: t('Intermediate') },
    { value: 'Advanced', label: t('Advanced') },
  ]

  const dayOptions = ['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => ({
    value: day,
    label: t(day)
  }))

  const specializationOptions = [
    { value: 'Medical', label: t('Medical') },
    { value: 'Legal', label: t('Legal') },
    { value: 'Technical', label: t('Technical') },
    { value: 'Tourism', label: t('Tourism') },
  ]

  const handleReset = () => {
    const resetFilters = {
      city: '',
      languages: [],
      expertiseLevel: '',
      pricePerHour: '',
      rating: 0,
      reviewsCount: 0,
      availability: [],
      specializations: [],
    }
    setFilters(resetFilters)
    onFilter(resetFilters)
  }

  useEffect(() => {
    onFilter(filters)
  }, [filters])

  return (
    <div className="translator-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>{t('City')}</label>
          <Select
            options={cityOptions}
            value={cityOptions.find(option => option.value === filters.city) || null}
            onChange={(selected) => handleChange('city', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Languages')}</label>
          <Select
            options={languageOptions}
            isMulti
            value={languageOptions.filter(option => filters.languages.includes(option.value))}
            onChange={(selected) => handleChange('languages', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Expertise Level')}</label>
          <Select
            options={expertiseOptions}
            value={expertiseOptions.find(option => option.value === filters.expertiseLevel) || null}
            onChange={(selected) => handleChange('expertiseLevel', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Price Per Hour')}</label>
          <input
            type="number"
            value={filters.pricePerHour}
            onChange={(e) => handleChange('pricePerHour', e.target.value)}
            className="form-control"
            placeholder={t('Price')}
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Rating')}</label>
          <input
            type="number"
            value={filters.rating}
            min="0"
            max="5"
            onChange={(e) => handleChange('rating', e.target.value)}
            className="form-control"
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Reviews Count')}</label>
          <input
            type="number"
            value={filters.reviewsCount}
            min="0"
            onChange={(e) => handleChange('reviewsCount', e.target.value)}
            className="form-control"
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Availability')}</label>
          <Select
            options={dayOptions}
            isMulti
            value={dayOptions.filter(option => filters.availability.includes(option.value))}
            onChange={(selected) => handleChange('availability', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('Specializations')}</label>
          <Select
            options={specializationOptions}
            isMulti
            value={filters.specializations.map(val => ({ value: val, label: t(val) }))}
            onChange={(selected) => handleChange('specializations', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="12" className="mt-3">
          <Button className="btn primary__btn" onClick={handleReset}>
            {t('Clear Filters')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default TranslatorFilter
