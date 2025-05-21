import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import '../styles/tour-filter.css'
import { useTranslation } from 'react-i18next'

const TourFilter = ({ onFilter }) => {
  const { t } = useTranslation()

  const [filters, setFilters] = useState({
    city: '',
    activityType: [],
    adventureLevel: '',
    availableDays: [],
    guideIncluded: null,
    mealsIncluded: null,
    languages: [],
  })

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const handleReset = () => {
    const resetFilters = {
      city: '',
      activityType: [],
      adventureLevel: '',
      availableDays: [],
      guideIncluded: null,
      mealsIncluded: null,
      languages: [],
    }
    setFilters(resetFilters)
    onFilter(resetFilters)
  }

  const cityOptions = [
    { value: 'Bodrum', label: t('cities.bodrum') },
    { value: 'Pamukkale', label: t('cities.pamukkale') },
    { value: 'Marmaris', label: t('cities.marmaris') },
    { value: 'Trabzon', label: t('cities.trabzon') },
    { value: 'Fethiye', label: t('cities.fethiye') },
    { value: 'Cappadocia', label: t('cities.cappadocia') },
    { value: 'Bursa', label: t('cities.bursa') },
    { value: 'Sabanca', label: t('cities.sabanca') },
    { value: 'Izmir', label: t('cities.izmir') },
  ]

  const activityOptions = [
    { value: 'Beach', label: t('activities.beach') },
    { value: 'Relax', label: t('activities.relax') },
    { value: 'Adventure', label: t('activities.adventure') },
    { value: 'Nature', label: t('activities.nature') },
    { value: 'Cultural', label: t('activities.cultural') },
    { value: 'Wellness', label: t('activities.wellness') },
    { value: 'Winter', label: t('activities.winter') },
  ]

  const dayOptions = ['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => ({
    value: day,
    label: t(`days.${day.toLowerCase()}`),
  }))

  useEffect(() => {
    onFilter(filters)
  }, [filters])

  return (
    <div className="tour-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>{t('filter.city')}</label>
          <Select
            options={cityOptions}
            value={cityOptions.find(option => option.value === filters.city) || null}
            onChange={(selected) => handleChange('city', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('filter.activityType')}</label>
          <Select
            options={activityOptions}
            isMulti
            value={activityOptions.filter(option => filters.activityType.includes(option.value))}
            onChange={(selected) => handleChange('activityType', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('filter.adventureLevel')}</label>
          <select
            className="form-select"
            value={filters.adventureLevel}
            onChange={(e) => handleChange('adventureLevel', e.target.value)}
          >
            <option value="">{t('filter.any')}</option>
            <option value="Low">{t('adventureLevels.low')}</option>
            <option value="High">{t('adventureLevels.high')}</option>
          </select>
        </Col>

        <Col lg="3" md="4">
          <label>{t('filter.availableDays')}</label>
          <Select
            options={dayOptions}
            isMulti
            value={dayOptions.filter(option => filters.availableDays.includes(option.value))}
            onChange={(selected) => handleChange('availableDays', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('filter.guideIncluded')}</label>
          <select
            className="form-select"
            value={filters.guideIncluded === null ? '' : filters.guideIncluded.toString()}
            onChange={(e) =>
              handleChange('guideIncluded', e.target.value === "" ? null : e.target.value === "true")
            }
          >
            <option value="">{t('filter.any')}</option>
            <option value="true">{t('yes')}</option>
            <option value="false">{t('no')}</option>
          </select>
        </Col>

        <Col lg="3" md="4">
          <label>{t('filter.mealsIncluded')}</label>
          <select
            className="form-select"
            value={filters.mealsIncluded === null ? '' : filters.mealsIncluded.toString()}
            onChange={(e) =>
              handleChange('mealsIncluded', e.target.value === "" ? null : e.target.value === "true")
            }
          >
            <option value="">{t('filter.any')}</option>
            <option value="true">{t('yes')}</option>
            <option value="false">{t('no')}</option>
          </select>
        </Col>

        <Col lg="12" className="mt-3">
          <Button className="btn primary__btn" onClick={handleReset}>
            {t('filter.clearFilters')}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default TourFilter
