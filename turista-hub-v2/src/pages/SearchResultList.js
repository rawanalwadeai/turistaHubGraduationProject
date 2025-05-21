import React  , {useState} from 'react'
import CommonSection from '../shared/CommonSection'
import { Container ,Row  , Col } from 'reactstrap'


import { useLocation } from 'react-router-dom'
import TourCard from '../shared/TourCard'

 import { useTranslation } from 'react-i18next'

const SearchResultList = () => {


  const {t} = useTranslation()
const location = useLocation()


const [data] = useState(location.state)

console.log(data)


  return <>
  
  <CommonSection  title={t('searchResult')}/>
  <section>
    <Container>
    <Row>
{
  data.length === 0 ?<h4  style={{   textAlign: 'center'  }}>{t('notFound')}</h4> : data?.map(tour => (
    <Col lg='3 ' className='mb-4' key={tour._id}> 
    <TourCard tour={tour}/>
    
    </Col>)
  )
}
    </Row>
    </Container>
  </section>
  
  </>
}

export default SearchResultList