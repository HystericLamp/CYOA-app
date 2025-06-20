import React, { useState, useEffect } from 'react';
import { useStoryContext } from '../context/StoryContext';
import TypewriterText from './TypewriterText';

/**
 * Component that creates and handles the story board that showcases the story the user builds
 *
 * @returns
 */
function StoryBoard() {
    const { story, setIsAnimating, loadingServer, error } = useStoryContext();
    const [doneAnimatingIndex, setDoneAnimatingIndex] = useState(-1);

    // Reset doneAnimatingIndex on story reset/new story load
    useEffect(() => {
        setDoneAnimatingIndex(-1);
    }, [story]);

    // If there's new text, start animating
    useEffect(() => {
        if (doneAnimatingIndex < story.length - 1) {
            setIsAnimating(true);
        }

    }, [doneAnimatingIndex, setIsAnimating, story]);

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl transition-all duration-500">
            {loadingServer ? (
                <div className="text-blue-600 font-medium animate-pulse">
                    Waking up the server, please wait...
                </div>
            ) : error ? (
            <div className="text-red-600 font-medium">
                {error}
            </div>
            ) : (
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
                                    key={line.text}
                                    text={line.text}
                                    onDone={() => {
                                        setDoneAnimatingIndex(index);
                                        setIsAnimating(false);
                                    }}
                                />
                            ) : (
                                // Show all previous lines immediately
                                line.text
                            )}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default StoryBoard;