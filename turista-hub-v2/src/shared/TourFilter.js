import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import '../styles/tour-filter.css'

const TourFilter = ({ onFilter }) => {
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

  // const handleApply = () => {
  //   onFilter(filters)
  // }

  const handleReset = () => {
    const resetFilters = {
      city: '',
      activityType: [],
      adventureLevel: '',
      availableDays: [],
      guideIncluded: null,
      mealsIncluded: null,
      languages: [],
    };
    setFilters(resetFilters);
    onFilter(resetFilters);  // إرسال الفلاتر الفارغة للمكون الأب
  };

  const cityOptions = [
    { value: 'Bodrum', label: 'Bodrum' },
    { value: 'Pamukkale', label: 'Pamukkale' },
    { value: 'Marmaris', label: 'Marmaris' },
    { value: 'Trabzon', label: 'Trabzon' },
    { value: 'Fethiye', label: 'Fethiye' },
    { value: 'Cappadocia', label: 'Cappadocia' },
    { value: 'Bursa', label: 'Bursa' },
    { value: 'Sabanca', label: 'Sabanca' },
    { value: 'Izmir', label: 'Izmir' },
  ]

  const activityOptions = [
    { value: 'Beach', label: 'Beach' },
    { value: 'Relax', label: 'Relax' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Wellness', label: 'Wellness' },
    { value: 'Winter', label: 'Winter' },
  ]

  const dayOptions = ['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => ({
    value: day, label: day
  }))


//عشان الفلتره الفوريه 
  useEffect(() => {
onFilter(filters)
  } , [filters])

  
  // const languageOptions = ['English', 'Turkish'].map(lang => ({
  //   value: lang, label: lang
  // }))
  return (
    <div className="tour-filter p-3 rounded shadow mb-4">
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
          <label>Activity Type</label>
          <Select
            options={activityOptions}
            isMulti
            value={activityOptions.filter(option => filters.activityType.includes(option.value))}
            onChange={(selected) => handleChange('activityType', selected.map(s => s.value))}
          />
        </Col>

        <Col lg="3" md="4">
          <label>Adventure Level</label>
          <select
            className="form-select"
            value={filters.adventureLevel}
            onChange={(e) => handleChange('adventureLevel', e.target.value)}
          >
            <option value="">Any</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
        </Col>

        <Col lg="3" md="4">
          <label>Available Days</label>
          <Select
            options={dayOptions}
            isMulti
            value={dayOptions.filter(option => filters.availableDays.includes(option.value))}
            onChange={(selected) => handleChange('availableDays', selected.map(s => s.value))}
          />
        </Col>
         {/* <Col lg="3" md="4">
          <label>Languages</label>
          <Select
            options={languageOptions}
            isMulti
            onChange={(selected) => handleChange('languages', selected.map(s => s.value))}
          />
        </Col> */}

        <Col lg="3" md="4">
          <label>Guide Included</label>
          <select
            className="form-select"
            value={filters.guideIncluded === null ? '' : filters.guideIncluded.toString()}
            onChange={(e) =>
              handleChange('guideIncluded', e.target.value === "" ? null : e.target.value === "true")
            }
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Col>

        <Col lg="3" md="4">
          <label>Meals Included</label>
          <select
            className="form-select"
            value={filters.mealsIncluded === null ? '' : filters.mealsIncluded.toString()}
            onChange={(e) =>
              handleChange('mealsIncluded', e.target.value === "" ? null : e.target.value === "true")
            }
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Col>

        <Col lg="12" className="mt-3">
          <Button className="btn primary__btn" onClick={handleReset}>Clear Filters</Button>
        </Col>
      </Row>
    </div>
  )
}

export default TourFilter
