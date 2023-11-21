import React, { useState } from 'react';
import Calendar from 'react-calendar';

const Test = () => {
    const [date, setDate] = useState(null);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };
    const formatDate = (date) => {
        const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
        return date ? date.toLocaleDateString('en-US', options).replace(/ /g, '/') : 'No date selected';
    };

    return (
        <>
            <div>Selected Date: {formatDate(date)}</div>
            <Calendar value={date} onChange={handleDateChange} />
        </>
    );
};

export default Test;