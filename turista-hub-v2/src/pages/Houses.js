import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection.js';

import '../styles/tour.css'
import HouseCard from '../shared/HouseCard.js';
import SearchBarHouse from '../shared/SearchBarHouse.js';
import { Container, Row, Col } from 'reactstrap';


import useFetchA from '../hooks/useFetchA.js';
import { BASE_URL } from '../utils/configB.js';
import HouseFilter from '../componenets/HouseFilter.js';


import { useTranslation } from 'react-i18next'

const Houses = () => {
 const {t} = useTranslation()
 
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);


  const {data:houses , loading , error} = useFetchA(`${BASE_URL}/houses?page=${page}`)
  const {data:houseCount} = useFetchA(`${BASE_URL}/houses/search/getPlaceCount`)



  const [showFilterPanell, setShowFilterPanell] = useState(false);
  const [filteredHouses, setFilteredHouses] = useState(houses);




  useEffect(() => {
    const pages = Math.ceil(houseCount / 8);
    setPageCount(pages);
    window.scrollTo(0,0)
  }, [page , houseCount , houses]);


  // const handleFilter = (filters) => {
  //   console.log(filters);
  
  //   // إذا لم يكن هناك فلتر، نعرض جميع المنازل
  //   if (Object.values(filters).every(val =>
  //     val === null || val === '' || (Array.isArray(val) && val.length === 0)
  //   )) {
  //     setFilteredHouses(houses);
  //     return;
  //   }
    
  
  //   // تصفية المنازل بناءً على الفلاتر
  //   const filtered = houses.filter(house => {
  //     return (
  //       // تصفية المدينة
  //       (!filters.city || house.city === filters.city) &&
        
  //       // تصفية نوع العقار
  //       (!filters.type || house.type === filters.type) &&
        
  //       // تصفية السعر
  //       (!filters.price || house.price <= filters.price) &&
        
  //       // تصفية عدد الغرف
  //       (!filters.bedrooms || house.bedrooms >= filters.bedrooms) &&
        
  //       // تصفية عدد الحمامات
  //       (!filters.bathrooms || house.bathrooms >= filters.bathrooms) &&
        
  //       // تصفية الحد الأقصى لعدد الأشخاص
  //       (!filters.maxGroupSize || house.maxGroupSize <= filters.maxGroupSize) &&
        
  //       // تصفية المرافق
  //       (filters.amenities.length === 0 || filters.amenities.every(amenity => house.amenities[amenity]))
  //     );
  //   });
  
  //   // تحديث المنازل المفلترة
  //   setFilteredHouses(filtered);
  // };
  
const handleFilter = async (filters) => {
  const params = new URLSearchParams();

  if (filters.city) params.append('city', filters.city);
  if (filters.type) params.append('type', filters.type);
  if (filters.price) params.append('price', filters.price);
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
  if (filters.bathrooms) params.append('bathrooms', filters.bathrooms);
  if (filters.maxGroupSize) params.append('maxGroupSize', filters.maxGroupSize);
  if (filters.amenities.length) params.append('amenities', filters.amenities.join(','));
  params.append('page', page);

 
   const response = await fetch(`${BASE_URL}/houses?${params.toString()}`);
   const result = await response.json();
    setFilteredHouses(result.data);
    setPageCount(Math.ceil(result.totalCount / 8));
 
};

  useEffect(() => {
    if (houses.length > 0) {
      setFilteredHouses(houses); // إذا تم تحميل البيانات، تعيين العروض الأصلية
    }
  }, [houses]);

 

  return (
    <>
      <CommonSection title={t('rental_houses')} />
      {/* <section>
        <Container>
          <Row>
            <SearchBarHouse />
          </Row>
        </Container>
      </section> */}

      <section>
        <Container>


          


        <Row className="mb-3">
            <Col lg="12" className="text-end">
              <button className='btn primary__btn'
                onClick={() => setShowFilterPanell(!showFilterPanell)}
              >
                {showFilterPanell ? t('close_filter') : <i className="fa-solid fa-filter" style={{'color': 'white'}}></i>}
              </button>
            </Col>
          </Row>

          {showFilterPanell && (
            <Row className="mb-4">
              <Col lg="12">
                <HouseFilter onFilter={handleFilter} />
              </Col>
            </Row>
          )}

        {loading && <h4 className='text-center pt-5'>{('loading')}.</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        {
          !loading && !error && <Row>
            {
              filteredHouses?.map(house => (
                <Col lg='3' className='mb-4' key={house._id}>
                  <HouseCard house={house} />
                </Col>
              ))
            }

           

           <Col lg='12'>
                 <div className='pagination d-flex align-items-center justify-content-center mt-4  gap-3'>
           {[...Array(pageCount).keys()].map(number => (
             <span 
             key={number} 
             onClick={() => setPage(number)}
               className= {page === number ? 'active__page' : ''}
               >
                {number+ 1} </span>
           ))}
           
           
                 </div>
                 </Col>
          </Row>
        }
          
        </Container>
      </section>
    </>
  );
};

export default Houses;
