    import React, { useState ,useEffect} from 'react'
    import Select from 'react-select'
    import { Row, Col, Button } from 'reactstrap'
    import '../styles/tour-filter.css'
    
    const TranslatorFilter = ({ onFilter }) => {
      const [filters, setFilters] = useState({
        city: '',
        languages: [], // تم تعديل الاسم ليصبح languages
        expertiseLevel: '',
        pricePerHour: '', // تعديل السعر ليصبح pricePerHour
        // priceRange: { min: 0, max: 100 },
        rating: 0,
        reviewsCount: 0,
        availability: [],
        specializations: [],
        // isCertified: false,
      })
    
      const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value })
      }
    
      const handleApply = () => {
        onFilter(filters)
      }
    
      const cityOptions = [
        { value: 'Istanbul', label: 'Istanbul' },
        { value: 'Cappadocia', label: 'Cappadocia' },
        { value: 'Izmir', label: 'Izmir' },
        { value: 'Bodrum', label: 'Bodrum' },
      ]
    
      const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Turkish', label: 'Turkish' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'French', label: 'French' },
      ]
    
      const expertiseOptions = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' },
      ]
    
      const dayOptions = ['Monday', 'Wednesday', 'Friday', 'Saturday'].map(day => ({
        value: day, label: day
      }))

      const handleReset = () => {
        const resetFilters = {
          city: '',
          languages: [], // تم تعديل الاسم ليصبح languages
          expertiseLevel: '',
          pricePerHour: '', // تعديل السعر ليصبح pricePerHour
          // priceRange: { min: 0, max: 100 },
          rating: 0,
          reviewsCount: 0,
          availability: [],
          specializations: [],
          // isCertified:
        };
        setFilters(resetFilters);
        onFilter(resetFilters);  // إرسال الفلاتر الفارغة للمكون الأب
      };

      useEffect(() => {
        onFilter(filters)
          } , [filters])
        
        
          return (
            <div className="translator-filter p-3 rounded shadow mb-4">
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
                  <label>Languages</label>
                  <Select
                    options={languageOptions}
                    isMulti
                    value={languageOptions.filter(option => filters.languages.includes(option.value))}
                    onChange={(selected) => handleChange('languages', selected.map(s => s.value))}
                  />
                </Col>
          
                <Col lg="3" md="4">
                  <label>Expertise Level</label>
                  <Select
                    options={expertiseOptions}
                    value={expertiseOptions.find(option => option.value === filters.expertiseLevel) || null}
                    onChange={(selected) => handleChange('expertiseLevel', selected?.value || '')}
                    isClearable
                  />
                </Col>
          
                <Col lg="3" md="4">
                  <label>Price Per Hour</label>
                  <input
                    type="number"
                    value={filters.pricePerHour}
                    onChange={(e) => handleChange('pricePerHour', e.target.value)}
                    className="form-control"
                    placeholder="Price"
                  />
                </Col>
          
                <Col lg="3" md="4">
                  <label>Rating</label>
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
                  <label>Reviews Count</label>
                  <input
                    type="number"
                    value={filters.reviewsCount}
                    min="0"
                    onChange={(e) => handleChange('reviewsCount', e.target.value)}
                    className="form-control"
                  />
                </Col>
          
                <Col lg="3" md="4">
                  <label>Availability</label>
                  <Select
                    options={dayOptions}
                    isMulti
                    value={dayOptions.filter(option => filters.availability.includes(option.value))}
                    onChange={(selected) => handleChange('availability', selected.map(s => s.value))}
                  />
                </Col>
          
                <Col lg="3" md="4">
                  <label>Specializations</label>
                  <Select
                    options={[
                      { value: 'Medical', label: 'Medical' },
                      { value: 'Legal', label: 'Legal' },
                      { value: 'Technical', label: 'Technical' },
                      { value: 'Tourism', label: 'Tourism' },
                    ]}
                    isMulti
                    value={filters.specializations.map(val => ({
                      value: val,
                      label: val,
                    }))}
                    onChange={(selected) => handleChange('specializations', selected.map(s => s.value))}
                  />
                </Col>
          
                {/* <Col lg="3" md="4">
                  <label>Certified</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isCertified"
                      checked={filters.isCertified}
                      onChange={(e) => handleChange('isCertified', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="isCertified">
                      Certified Only
                    </label>
                  </div>
                </Col> */}
          
                <Col lg="12" className="mt-3">
                  <Button className="btn primary__btn" onClick={handleReset}>Clear Filters</Button>
                </Col>
              </Row>
            </div>
          )


}          
    
    export default TranslatorFilter
    