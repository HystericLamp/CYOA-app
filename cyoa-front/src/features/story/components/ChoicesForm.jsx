import React from 'react';
import { useStoryContext } from '../context/StoryContext';

function ChoicesForm() {
    const { submitStoryChoice, setChoice, choices } = useStoryContext();

    return (
        <form onSubmit={submitStoryChoice} className="p-4">
            <div className="flex flex-col space-y-4">
                {choices.map((choice, index) => (
                    <button
                        type='submit'
                        key={index} 
                        value={choice}
                        onClick={() => setChoice(choice)}
                        className='bg-blue-500 text-white px-4 py-2 rounded'
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </form>
    );
}

export default ChoicesForm;