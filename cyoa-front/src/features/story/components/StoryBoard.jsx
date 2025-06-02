import React from 'react';

import { useStoryContext } from '../context/StoryContext';

function StoryBoard() {
    const { story } = useStoryContext();
    
    return (
        <p className="text-gray-800 mb-6">
            {story.map((line, index) => (
                <React.Fragment key={index}>
                    {line}<br />
                    <br/>
                </React.Fragment>
            ))}
        </p>
    );
}

export default StoryBoard;