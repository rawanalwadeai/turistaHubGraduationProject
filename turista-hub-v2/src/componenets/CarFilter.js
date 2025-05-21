import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Row, Col, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import '../styles/tour-filter.css'

const CarFilter = ({ onFilter }) => {
  const { t } = useTranslation()

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
    }
    setFilters(resetFilters)
    onFilter(resetFilters)
  }

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const locationOptions = [
    { value: 'Istanbul', label: t('Istanbul') },
    { value: 'Ankara', label: t('Ankara') },
    { value: 'Izmir', label: t('Izmir') },
    { value: 'Antalya', label: t('Antalya') },
  ]

  const typeOptions = [
    { value: 'Sedan', label: t('Sedan') },
    { value: 'SUV', label: t('SUV') },
    { value: 'Sports', label: t('Sports') },
    { value: 'Luxury', label: t('Luxury') },
    { value: 'Electric', label: t('Electric') },
  ]

  const fuelTypeOptions = [
    { value: 'Petrol', label: t('Petrol') },
    { value: 'Diesel', label: t('Diesel') },
    { value: 'Electric', label: t('Electric') },
  ]

  const doorsOptions = Array.from({ length: 5 }, (_, i) => i + 2).map(i => ({
    value: i,
    label: `${i} ${t('Door')}${i > 1 ? 's' : ''}`,
  }))

  const seatsOptions = Array.from({ length: 6 }, (_, i) => i + 2).map(i => ({
    value: i,
    label: `${i} ${t('Seat')}${i > 1 ? 's' : ''}`,
  }))

  const rentalPriceOptions = [
    { value: '25', label: `${t('Under')} 25` },
    { value: '50', label: `${t('Under')} 50` },
    { value: '100', label: `${t('Under')} 100` },
    { value: '150', label: `${t('Under')} 150` },
  ]

  const transmissionOptions = [
    { value: 'Automatic', label: t('Automatic') },
    { value: 'Manual', label: t('Manual') },
  ]

  const conditionOptions = [
    { value: 'New', label: t('New') },
    { value: 'Like New', label: t('Like New') },
    { value: 'Used', label: t('Used') },
  ]

  const amenitiesOptions = [
    { value: 'AC', label: t('Air Conditioning') },
    { value: 'Bluetooth', label: t('Bluetooth') },
    { value: 'GPS', label: t('GPS') },
    { value: 'Leather Seats', label: t('Leather Seats') },
    { value: 'Sunroof', label: t('Sunroof') },
  ]

  useEffect(() => {
    onFilter(filters)
  }, [filters])

  return (
    <div className="car-filter p-3 rounded shadow mb-4">
      <Row>
        <Col lg="3" md="4">
          <label>{t('location')}</label>
          <Select
            options={locationOptions}
            value={locationOptions.find(opt => opt.value === filters.location) || null}
            onChange={selected => handleChange('location', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('type')}</label>
          <Select
            options={typeOptions}
            value={typeOptions.find(opt => opt.value === filters.type) || null}
            onChange={selected => handleChange('type', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('fuelType')}</label>
          <Select
            options={fuelTypeOptions}
            value={fuelTypeOptions.find(opt => opt.value === filters.fuelType) || null}
            onChange={selected => handleChange('fuelType', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('doors')}</label>
          <Select
            options={doorsOptions}
            value={doorsOptions.find(opt => opt.value === filters.doors) || null}
            onChange={selected => handleChange('doors', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('seats')}</label>
          <Select
            options={seatsOptions}
            value={seatsOptions.find(opt => opt.value === filters.seats) || null}
            onChange={selected => handleChange('seats', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('rentalPrice')}</label>
          <Select
            options={rentalPriceOptions}
            value={rentalPriceOptions.find(opt => opt.value === filters.rentalPrice) || null}
            onChange={selected => handleChange('rentalPrice', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('transmission')}</label>
          <Select
            options={transmissionOptions}
            value={transmissionOptions.find(opt => opt.value === filters.transmission) || null}
            onChange={selected => handleChange('transmission', selected?.value || '')}
            isClearable
          />
        </Col>

        <Col lg="3" md="4">
          <label>{t('condition')}</label>
          <Select
            options={
amenitiesOptions}
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
