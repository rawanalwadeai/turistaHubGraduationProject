import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/thank-you.css'

const ThankYou = () => {
  const { t } = useTranslation()

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>

              <h1 className="mb-3 fw-semibold">{t('ThankYou')}</h1>
              <h3 className="mb-4">{t('BookingConfirmed')}</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home" className="text-white text-decoration-none">
                  {t('BackToHome')}
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ThankYou
