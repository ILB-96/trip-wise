import React, { useState } from 'react';
import Day from './day';

const TripPlanner: React.FC = () => {
    const [tripName, setTripName] = useState<string>('Your trip name');
    const [numberOfDays, setNumberOfDays] = useState<number>(4); // Default number of days
    const [days, setDays] = useState<string[]>(['day 1', 'day 2', 'day 3', 'day 4']);

    const handleAddDay = () => {
        const newDay = `day ${days.length + 1}`;
        setDays([...days, newDay]);
        setNumberOfDays(days.length + 1);
    };

    return (
        <div>
            <input
                type="text"
                value={tripName}
                onChange={e => setTripName(e.target.value)}
                placeholder="Enter trip name"
            />
            <div>days number {numberOfDays}</div>
            {days.map((day, index) => (
                <Day key={index} day={day} />
            ))}
            <button onClick={handleAddDay}>add day</button>
            <button>save</button>
        </div>
    );
};

export default TripPlanner;
