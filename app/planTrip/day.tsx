import React from 'react';

interface DayProps {
    day: string;
}

const Day: React.FC<DayProps> = ({ day }) => {
    return (
        <div>
            <h3>{day}</h3>
            {/* Add more details or inputs here as needed */}
        </div>
    );
};

export default Day;
