import React , {useState , useEffect} from 'react'
import CommonSection from '../shared/CommonSection'


import '../styles/tour.css'
import tourData from '../assets/data/tours.js'
import TourCard from './../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import { Container ,Row ,Col } from 'reactstrap'



import TourFilter from '../shared/TourFilter.js'

//F
import useFetchA from '../hooks/useFetchA.js'
import { BASE_URL } from '../utils/configB.js'



import { useTranslation } from 'react-i18next'


const Tour = () => {
const {t} = useTranslation()

const [pageCount ,setPageCount] = useState(0)
const [page,setPage] =useState(0)


//F
const {data:tours , loading , error} = useFetchA(`${BASE_URL}/tours?page=${page}`)
const {data:tourCount} = useFetchA(`${BASE_URL}/tours/search/getTourCount`)

const [showFilterPanel, setShowFilterPanel] = useState(false);
const [filteredTours, setFilteredTours] = useState(tours);

useEffect (() => {

const pages = Math.ceil(tourCount / 8); 
setPageCount(pages)
window.scrollTo(0,0)

} , [page , tourCount , tours])

const handleFilter = (filters) => {
  console.log(filters);
  
  // إذا لم يكن هناك فلتر، نعرض جميع العروض
  if (Object.values(filters).every(val =>
    val === null || val === '' || (Array.isArray(val) && val.length === 0)
  )) {
    setFilteredTours(tours);
    return;
  }
  
  

  
  // تصفية العروض بناءً على الفلاتر
  const filtered = tours.filter(tour => {
    return (
      (!filters.city || tour.city === filters.city) &&
      (!filters.activityType.length || filters.activityType.includes(tour.activityType)) &&
      (!filters.adventureLevel || tour.adventureLevel === filters.adventureLevel) &&
      (!filters.availableDays.length || filters.availableDays.some(day => tour.availableDays.includes(day))) &&
      (filters.guideIncluded === null || tour.guideIncluded === filters.guideIncluded) &&
      (filters.mealsIncluded === null || tour.mealsIncluded === filters.mealsIncluded) 
      // (!filters.languages.length || filters.languages.some(lang => tour.languages.includes(lang)))
    );
  });

  // تحديث العروض المفلترة
  setFilteredTours(filtered);
};






useEffect(() => {
  if (tours.length > 0) {
    setFilteredTours(tours); // إذا تم تحميل البيانات، تعيين العروض الأصلية
  }
}, [tours]);




  return (
<>

{/* <CommonSection title={"All tours"} />
<section>
  <Container>
    <Row>
      <SearchBar />
    </Row>
  </Container>
</section> */}


<CommonSection title={t('all_tours')} />
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
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                {showFilterPanel ? t('close_filter') : <i className="fa-solid fa-filter" style={{'color': 'white'}}></i>}
              </button>
            </Col>
          </Row>

          {showFilterPanel && (
            <Row className="mb-4">
              <Col lg="12">
                <TourFilter onFilter={handleFilter} />
              </Col>
            </Row>
          )}
{/*** F */}
{loading && <h4 className='text-center pt-5'>{t('loading')}</h4>}
{error && <h4 className='text-center pt-5'>{error}</h4>}

    {
      !loading && !error &&<Row>
      {
          filteredTours?.map(tour => (
            <Col lg='3 ' md='6' sm='6' className='mb-4' key={tour._id}>
              <TourCard tour={tour} />
            </Col>
          ))
        }






      <Col lg='12'>
      <div className='pagination d-flex align-items-center justify-content-center mt-4  gap-3'>
{[... Array(pageCount).keys()].map(number => (
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



</>  )
}

export default Tour