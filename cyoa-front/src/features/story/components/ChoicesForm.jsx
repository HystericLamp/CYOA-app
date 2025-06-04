import React, { useEffect } from 'react';
import { useStoryContext } from '../context/StoryContext';

/**
 * Component that creates and handles the button choices for the story page
 *
 * @returns
 */
function ChoicesForm() {
    const { submitStoryChoice, setChoice, choices, isAnimating } = useStoryContext();

    useEffect(() => {
        // Remove focus from currently focused element when choices update
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }, [choices]);

    return (
        <form onSubmit={submitStoryChoice} className="p-4">
            <div className="flex flex-col space-y-4">
                {choices.map((choice, index) => (
                    <button
                        type='submit'
                        key={index} 
                        value={choice}
                        disabled={isAnimating}
                        onClick={() => setChoice(choice)}
                        className={`relative overflow-hidden group px-6 py-3 rounded-2xl text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isAnimating 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:scale-105 hover:from-blue-500 hover:to-blue-300 focus:ring-blue-300 cursor-pointer'
                        }`}
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </form>
    );
}

export default ChoicesForm;