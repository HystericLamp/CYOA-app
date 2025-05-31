import React from 'react';
import { useStory } from '../hooks/useStory';

function StoryBoard() {
    const { story } = useStory();
    
    return (
        <p className="text-gray-800 mb-6">
            {story.map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br/>
                </React.Fragment>
            ))}
        </p>
    );
}

export default StoryBoard;