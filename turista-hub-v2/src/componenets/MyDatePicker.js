import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = ({
  selected,
  onChange,
  minDate,
  placeholder,
  excludeDates,
  excludeTimes,
  showTime = false,         // 👈 متغير جديد للتحكم بعرض الوقت
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      placeholderText={placeholder}
      excludeDates={excludeDates}
      excludeTimes={excludeTimes}
      showTimeSelect={showTime}
      timeIntervals={60}
      timeFormat="HH:mm"
      dateFormat={showTime ? 'yyyy-MM-dd h:mm aa' : 'yyyy-MM-dd'}
    />
  );
};

export default MyDatePicker;
