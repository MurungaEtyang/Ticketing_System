import React, { useState, useEffect } from 'react';

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setDisplayText((prevText) => prevText + text[currentIndex]);
            currentIndex++;
            if (currentIndex === text.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [text]);

    return <h2>{displayText}</h2>;
};

export default TypingEffect;