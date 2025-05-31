import { useState, useEffect } from "react";
import { getStoryIntro, postNextStoryPrompt } from "../api/storyService";

export const useStory = () => {
    const [story, setStory] = useState([]);
    const [scenario, setScenario] = useState('');
    const [choices, setChoices] = useState([]);
    const [selectedChoice, setChoice] = useState('');

    useEffect(() => {
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

        try {
            const data = await postNextStoryPrompt('story', { selectedChoice });
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