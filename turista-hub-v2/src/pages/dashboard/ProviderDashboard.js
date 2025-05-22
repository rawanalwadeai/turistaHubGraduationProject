import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Sidebar = ({ setActivePage }) => (
    <div style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#222',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box',
    }}>
        <h2>Dashboard</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setActivePage('home')}>Home</li>
            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setActivePage('addCard')}>Add Card</li>
            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setActivePage('editCard')}>Edit Card</li>
            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setActivePage('deleteCard')}>Delete Card</li>
            <li style={{ padding: '10px', cursor: 'pointer' }} onClick={() => setActivePage('viewBookings')}>View Bookings</li>
        </ul>
    </div>
);

const Home = () => (
    <div>
        <h1>Welcome to your Dashboard</h1>
        <p>Total Bookings: 24</p>
        <p>Pending Requests: 5</p>
        {/* أضف إحصائيات أو ملخصات أكثر هنا */}
    </div>
);

const AddCard = () => {

 const [cardType, setCardType] = useState('');

  const handleFormSubmit = (data) => {
    console.log('Form data:', data);
    // هنا ممكن ترسل البيانات إلى السيرفر أو تعالجها بأي طريقة تريد
  };

<div>

     <h1>Add New Card</h1>
      <select onChange={e => setCardType(e.target.value)} value={cardType}>
        <option value="">Select Type</option>
        <option value="car">Car</option>
        <option value="house">House</option>
        <option value="tour">Tour</option>
        <option value="boat">Boat</option>
        <option value="translator">Translator</option>
      </select>


      {cardType === 'tour' && <addTour onSubmit={handleFormSubmit}/> }
      {cardType === 'house ' && <addHouse onSubmit={handleFormSubmit}/>}
            {cardType === 'car' && <addCar onSubmit={handleFormSubmit}/> }
      {cardType === 'boat' && <addBoat onSubmit={handleFormSubmit}/> }
      {cardType === 'translator' && <addTranslator onSubmit={handleFormSubmit}/> }

      
      </div>
};

const EditCard = () => (
    <div>
        <h1>Edit Existing Card</h1>
        {/* هنا تضيف واجهة اختيار الكرت للتعديل */}
    </div>
);

const DeleteCard = () => (
    <div>
        <h1>Delete Card</h1>
        {/* هنا تضيف واجهة اختيار الكرت للحذف */}
    </div>
);

const ViewBookings = () => (
    <div>
        <h1>Bookings</h1>
        {/* قائمة الحجوزات */}
    </div>
);

const ProviderDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activePage, setActivePage] = useState('home');

    if (!user || user.role !== 'provider') {
        return <Navigate to='/' />
    }

    let content;
    switch (activePage) {
        case 'addCard':
            content = <AddCard />;
            break;
        case 'editCard':
            content = <EditCard />;
            break;
        case 'deleteCard':
            content = <DeleteCard />;
            break;
        case 'viewBookings':
            content = <ViewBookings />;
            break;
        default:
            content = <Home />;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar setActivePage={setActivePage} />
            <div style={{ padding: 20, flex: 1 }}>
                {content}
            </div>
        </div>
    );
};

export default ProviderDashboard;
