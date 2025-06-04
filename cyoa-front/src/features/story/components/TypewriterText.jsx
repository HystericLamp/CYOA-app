import React, { useEffect, useState } from 'react';

/**
 * A text animation component that simulates typing effect, one character at a time.
 *
 * @param {Object} props
 * @param {string} props.text - The full string to animate
 * @param {number} [props.speed=30] - Speed per character in ms
 * @param {Function} [props.onDone] - Called when typing is finished
 */
const TypewriterText = ({ text, speed = 30, onDone }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
            setIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            onDone?.();
        }
    }, [index, text, speed, onDone]);

    return <span>{text.slice(0, index)}</span>;
};

export default TypewriterText;
