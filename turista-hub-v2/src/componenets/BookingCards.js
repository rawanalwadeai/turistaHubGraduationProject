import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils/configB';

const BookingCards = ({ userId }) => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.log("No userId provided");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${userId}/fullbookings`, {
          credentials: 'include',
        });
        const result = await res.json();

        if (res.ok) {
          const data = result.data || result;
          const allBookings = [
            ...(data.tours?.map(t => ({ ...t, serviceType: 'tour' })) || []),
            ...(data.houses?.map(h => ({ ...h, serviceType: 'house' })) || []),
            ...(data.cars?.map(c => ({ ...c, serviceType: 'car' })) || []),
            ...(data.boats?.map(b => ({ ...b, serviceType: 'boat' })) || []),
          ];
          setBookings(allBookings);
        } else {
          toast.error(t('fetchError'));
        }
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error(t('fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, t]);

  const getBookingName = (booking) => {
    switch (booking.serviceType) {
      case 'tour': return booking.tourName;
      case 'house': return booking.placeName;
      case 'car': return booking.carTitle;
      case 'boat': return booking.boatName;
      default: return t('nameUnavailable');
    }
  };

  if (loading) return <p>{t('loading')}</p>;

  if (!Array.isArray(bookings)) return <p>{t('bookingError')}</p>;

  if (bookings.length === 0) return <p>{t('noBookings')}</p>;

  return (
    <div className="booking-list">
      {bookings.map((b) => (
        <div 
          key={b._id} 
          className="booking-card border rounded p-3 mb-2"
          style={{ border: '1px solid black', marginBottom: '8px' }}
        >
          <strong>{t(`serviceType.${b.serviceType}`)}</strong> <br />
          <span>{getBookingName(b)} - </span>
          <span style={{ color: b.paymentStatus === t('status.canceled') ? 'red' : 'green' }}>
            {b.paymentStatus || t('status.unknown')}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BookingCards;
