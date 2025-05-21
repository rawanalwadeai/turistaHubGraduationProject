import React, { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/tour.css'

import carData from '../assets/data/cars.js'
import CarCard from '../shared/CarCard'
// import SearchBar from '../shared/SearchBar'
import { Container, Row, Col } from 'reactstrap'


import useFetchA from '../hooks/useFetchA.js'
import { BASE_URL } from '../utils/configB.js'

import CarFilter from '../componenets/CarFilter.js'

import { useTranslation } from 'react-i18next'





const Cars = () => {
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

const {t} = useTranslation()

  //F
const {data:cars , loading , error} = useFetchA(`${BASE_URL}/cars?page=${page}`)
const {data:carCount} = useFetchA(`${BASE_URL}/cars/count`)



  const [showFilterPanelll, setShowFilterPanelll] = useState(false);
  const [filteredCars, setFilteredCars] = useState(cars);

  useEffect(() => {
    const pages = Math.ceil((carCount?.data || 0) / 4)
    setPageCount(pages)
  }, [page ,carCount , cars]

)

const handleFilter = (filters) => {
  console.log(filters);

  // إذا لم يكن هناك فلتر، نعرض جميع السيارات
  if (Object.values(filters).every(val =>
    val === null || val === '' || (Array.isArray(val) && val.length === 0)
  )) {
    setFilteredCars(cars);
    return;
  }

  // تصفية السيارات بناءً على الفلاتر
  const filtered = cars.filter(car => {
    return (
      (!filters.location || car.location === filters.location) &&
      (!filters.type || car.type === filters.type) &&
      (!filters.fuelType || car.fuelType === filters.fuelType) &&
      (!filters.doors || car.doors === parseInt(filters.doors)) &&
      (!filters.seats || car.seats === parseInt(filters.seats)) &&
      (!filters.rentalPrice || car.price <= parseFloat(filters.rentalPrice)) &&
      (!filters.transmission || car.transmission === filters.transmission) &&
      (!filters.condition || car.condition === filters.condition) &&
      (!filters.amenities || filters.amenities.every(a => car.amenities?.includes(a)))
    );
  });

  // تحديث السيارات المفلترة
  setFilteredCars(filtered);
};

useEffect(() => {
  if (cars.length > 0) {
    setFilteredCars(cars); // إذا تم تحميل البيانات، تعيين العروض الأصلية
  }
}, [cars]);




  return (
    <>
      <CommonSection title={t('all_cars')} />

      {/* <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section> */}

      <section>
        <Container>



<Row className="mb-3">
            <Col lg="12" className="text-end">
              <button className='btn primary__btn'
                onClick={() => setShowFilterPanelll(!showFilterPanelll)}
              >
                {showFilterPanelll ? t('close_filter') : <i className="fa-solid fa-filter" style={{'color': 'white'}}></i>}
              </button>
            </Col>
          </Row>

          {showFilterPanelll && (
            <Row className="mb-4">
              <Col lg="12">
                <CarFilter onFilter={handleFilter} />
              </Col>
            </Row>
          )}

        {loading && <h4 className='text-center pt-5'>{t('loading')}</h4>}
{error && <h4 className='text-center pt-5'>{error}</h4>}


{
      !loading && !error &&  <Row>
            
            {
              filteredCars?.map(car => (
                <Col lg='3' className='mb-4' key={car._id}>
                  <CarCard car={car} />
                </Col>
              ))
            }



            <Col lg='12'>
              <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                {[...Array(pageCount).keys()].map(number => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? 'active__page' : ''}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
}

        
        </Container>
      </section>
    </>
  )
}

export default Cars
