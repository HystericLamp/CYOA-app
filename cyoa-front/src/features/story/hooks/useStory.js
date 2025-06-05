import { useState, useEffect, useRef } from "react";
import { getStoryIntro, postNextStoryPrompt } from "../api/storyService";

export const useStory = () => {
    const [story, setStory] = useState([]);
    const [choices, setChoices] = useState([]);
    const [selectedChoice, setChoice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchStoryIntro = async () => {
            try {
                const data = await getStoryIntro('story');
                setStory([{ type: 'scenario', text: data.scenario }]);
                setChoices(data.choices);
            } catch (error) {
                console.error('Fetching story introduction failed', error);
            }
        }

        fetchStoryIntro();
    }, []);

    const submitStoryChoice = async (event) => {
        event.preventDefault();

        if (typeof selectedChoice !== 'string') {
            console.error('Invalid choice value', selectedChoice);
            return;
        }

        setIsLoading(true);

        setStory(prev => [
            ...prev,
            { type: 'choice', text: selectedChoice }
        ]);
        setChoices([]);

        try {
            const data = await postNextStoryPrompt('story', { userAction: selectedChoice });

            setStory(prev => [
                                ...prev, 
                                { type: 'scenario', text: data.result }
                            ]);
            setChoices([]);
            setChoices(data.choices);
        } catch (error) {
            console.error('Fetching next story scenario failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        story,
        choices,
        selectedChoice,
        setChoice,
        submitStoryChoice,
        isLoading,
        isAnimating,
        setIsAnimating
    };
}