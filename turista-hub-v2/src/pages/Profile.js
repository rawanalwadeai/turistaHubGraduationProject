import { BASE_URL } from '../utils/configB';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import BookingCards from '../componenets/BookingCards'; 
import '../styles/profile.css';
import { useTranslation } from 'react-i18next';

import userIcon from '../assets/images/user.png'
const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    photo: '',
  });

  const {t} = useTranslation()
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        photo: user.photo || '',
      });
    }
  }, [user]);

  
  const handleChange = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhotoClick = () => setEditMode(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
toast.success(t('updateSuccess'));
      dispatch({ type: 'UPDATE_USER', payload: result.data });
      setEditMode(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  

  return (
    <section className="profile-section">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="profile-box shadow p-4 rounded">
              <div className="text-center mb-4">
                <div className="profile-photo-wrapper" onClick={handlePhotoClick}>
                  <img
                    src={profileData.photo ||  userIcon}
                    alt="Profile"
                    className="profile-photo"
                  />
                  
                </div>
                <h3 className="mt-3">{profileData.username}</h3>
              </div>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label>{t('username')}</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={profileData.username}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>{t('phone')}</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </FormGroup>

                {editMode && (
                  <FormGroup>
                    <label>{t('photoUrl')}</label>
                    <input
                      type="text"
                      id="photo"
                      className="form-control"
                      value={profileData.photo}
                      onChange={handleChange}
                    />
                  </FormGroup>
                )}

                <Button type="submit" className="w-100 mt-3 primary__btn">
{t('saveChanges')}                </Button>
              </Form>

              <hr className="my-4" />

              <h5 className="mb-3">{t('bookingsTitle')}</h5>
              
              <BookingCards userId={user?._id} />



            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
