import React, { useState, useEffect } from 'react';
import './assets/stylesheet/clock.css'
const AnalogClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hourDeg = (time.getHours() % 12 + time.getMinutes() / 60) * 30;
    const minuteDeg = (time.getMinutes() + time.getSeconds() / 60) * 6;
    const secondDeg = time.getSeconds() * 6;

    const formattedTime = `${formatDigit(time.getHours())}:${formatDigit(time.getMinutes())}:${formatDigit(time.getSeconds())}`;

    function formatDigit(digit) {
        return digit < 10 ? `0${digit}` : digit;
    }

    return (
        <div className="clock-container">
            <div className="analog-clock">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="1" fill="white" />
                    {Array.from({ length: 12 }).map((_, index) => {
                        const angle = (index - 3) * 30;
                        const x = 100 + 75 * Math.cos((angle * Math.PI) / 180);
                        const y = 100 + 75 * Math.sin((angle * Math.PI) / 180);
                        return (
                            <text key={index} x={x} y={y} fontSize="14" textAnchor="middle" dominantBaseline="central">
                                {index + 1}
                            </text>
                        );
                    })}
                    <line x1="100" y1="100" x2="100" y2="55" stroke="black" strokeWidth="4" transform={`rotate(${hourDeg} 100 100)`} />
                    <line x1="100" y1="100" x2="100" y2="30" stroke="black" strokeWidth="2" transform={`rotate(${minuteDeg} 100 100)`} />
                    <line x1="100" y1="100" x2="100" y2="20" stroke="red" strokeWidth="1" transform={`rotate(${secondDeg} 100 100)`} />
                    <circle cx="100" cy="100" r="4" fill="black" />
                </svg>
            </div>
            <div className="digital-clock">
                <div className="time">{formattedTime}</div>
            </div>
        </div>
    );
};

export default AnalogClock;

