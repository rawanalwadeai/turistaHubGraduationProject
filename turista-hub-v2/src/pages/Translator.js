import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import useFetchA from '../hooks/useFetchA';
import { BASE_URL } from '../utils/configB';
import TranslatorCard from '../shared/translatorCard';
import TranslatorFilter from '../componenets/TranslatorFilter';

import '../styles/tour.css';

import { useTranslation } from 'react-i18next';
const Translator = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filteredtranslator, setFilteredtranslator] = useState([]);

  const { data: translator, loading, error } = useFetchA(`${BASE_URL}/translator?page=${page}`);
  const { data: translatorCount } = useFetchA(`${BASE_URL}/translator/count/total`);


  const {t} = useTranslation()
  useEffect(() => {
    const pages = Math.ceil(translatorCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, translatorCount, translator]);



  const handleFilter = async (filters) => {
    const params = new URLSearchParams();


  if (filters.city) params.append('city', filters.city);
  if (filters.languages?.length) params.append('languages', filters.languages.join(','));
  if (filters.expertiseLevel) params.append('expertiseLevel', filters.expertiseLevel);
  if (filters.pricePerHour) params.append('pricePerHour', filters.pricePerHour);
  if (filters.rating) params.append('rating', filters.rating);
  if (filters.availability?.length) params.append('availability', filters.availability.join(','));
  if (filters.specializations?.length) params.append('specializations', filters.specializations.join(','));
  if (filters.isCertified !== undefined) params.append('isCertified', filters.isCertified);
 
  params.append('page', page);

  const res = await fetch(`${BASE_URL}/translator?${params.toString()}`)
      const result = await res.json();

      setFilteredtranslator(result.data);
      setPageCount(Math.ceil(result.totalCount / 8));
   };
  


  
  
  useEffect(() => {
    if (translator.length > 0) {
      setFilteredtranslator(translator);
    }
  }, [translator]);
  return (
    <>
      <CommonSection title={t('all_translators')} />
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
              <button className="btn primary__btn" onClick={() => setShowFilterPanel(!showFilterPanel)}>
                {showFilterPanel ? t('close_filter') : <i className="fa-solid fa-filter" style={{ color: 'white' }}></i>}
              </button>
            </Col>
          </Row>

          {showFilterPanel && (
            <Row className="mb-4">
              <Col lg="12">
                <TranslatorFilter onFilter={handleFilter} />
              </Col>
            </Row>
          )}

          {loading && <h4 className="text-center pt-5">{t('loading')}</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {filteredtranslator.map(translator => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={translator._id}>
                  <TranslatorCard translator={translator} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
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
          )}
        </Container>
      </section>
    </>
  );
};

export default Translator;
