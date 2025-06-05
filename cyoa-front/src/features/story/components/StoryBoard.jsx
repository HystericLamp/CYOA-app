import React, { useState, useEffect } from 'react';
import { useStoryContext } from '../context/StoryContext';
import TypewriterText from './TypewriterText';

/**
 * Component that creates and handles the story board that showcases the story the user builds
 *
 * @returns
 */
function StoryBoard() {
    const { story, setIsAnimating } = useStoryContext();
    const [doneAnimatingIndex, setDoneAnimatingIndex] = useState(-1);

    useEffect(() => {
    // If there's new text, start animating
    if (doneAnimatingIndex < story.length - 1) {
        setIsAnimating(true);
    }
    }, [story]);

    return (
        <div className="text-gray-800 mb-6 space-y-4">
            {story.map((line, index) => {
            const isLast = index === story.length - 1;

            const className =
                line.type === 'choice'
                ? 'text-blue-600 font-semibold'
                : '';

            return (
                <p key={index} className={className}>
                {line.type === 'choice' ? (
                    line.text
                ) : index <= doneAnimatingIndex ? (
                    line.text
                ) : isLast ? (
                    <TypewriterText
                        text={line.text}
                        onDone={() => {
                            setDoneAnimatingIndex(index);
                            setIsAnimating(false);
                        }}
                    />
                ) : null}
                </p>
            );
            })}
        </div>
    );
}

export default StoryBoard;