import { useState, useEffect, useRef } from "react";
import { getStoryIntro, postNextStoryPrompt } from "../api/storyService";

export const useStory = () => {
    const [story, setStory] = useState([]);
    const [scenario, setScenario] = useState('');
    const [choices, setChoices] = useState([]);
    const [selectedChoice, setChoice] = useState('');
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchStoryIntro = async () => {
            try {
                const data = await getStoryIntro('story');
                setScenario(data.scenario);
                setStory([data.scenario]);
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

        try {
            const data = await postNextStoryPrompt('story', { userAction: selectedChoice });

            setScenario(data.result);
            setStory(prev => [...prev, selectedChoice, data.result]);
            setChoices([]);
            setChoices(data.choices);
        } catch (error) {
            console.error('Fetching next story scenario failed', error);
        }
    };

    return {
        story,
        scenario,
        choices,
        selectedChoice,
        setChoice,
        submitStoryChoice,
    };
}