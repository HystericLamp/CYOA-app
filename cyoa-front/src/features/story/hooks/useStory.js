import { useState, useEffect, useRef } from "react";
import { fetchWithWakeup } from '../../../utils/fetchWithWakeup';
import { getStoryIntro, postNextStoryPrompt } from "../api/storyService";
import { postReset } from "../api/resetService";

export const useStory = () => {
    // For use with fetchWithWakeup
    const [loadingServer, setLoadingServer] = useState(true);
    const [error, setError] = useState('');

    // Storyboard related
    const [story, setStory] = useState([]);
    const [choices, setChoices] = useState([]);
    const [selectedChoice, setChoice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const hasFetched = useRef(false);

    /**
     * Handles logic for setting up the introductory story scenario and choices
     * Should be called when page loads
     */
    const fetchStoryIntro = async () => {
        try {
            const data = await fetchWithWakeup(getStoryIntro('story'), { retries: 1, timeout: 15000 });
            setStory([{ type: 'scenario', text: data.scenario }]);
            setChoices(data.choices);
            setIsEnd(false);
        } catch (error) {
            console.error('Fetching story introduction failed', error);
            setError('Unable to connect to the server. Please try again.');
        } finally {
            setLoadingServer(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchStoryIntro();
    }, []);

    /**
     * Handles logic when a user clicks a choice button in storyboard and builds up the story
     * @param {*} event 
     */
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

            if (data.end) {
                setIsEnd(data.end);
            }

        } catch (error) {
            console.error('Fetching next story scenario failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * When the user presses the reset button, resets story, story choices, and session
     * @param {*} event 
     */
    const submitHandleReset = async (event) => {
        event.preventDefault();

        try {
            const data = await postReset('reset');

            if (data.reset) {
                setStory([]);
                setChoices([]);
                setChoice('');
                setIsEnd(false);
                hasFetched.current = false;

                await fetchStoryIntro();
            }
        } catch (error) {
            console.error('Submit handle reset failed', error);
        }
    };

    return {
        loadingServer,
        error,
        
        story,
        choices,
        selectedChoice,
        setChoice,
        submitStoryChoice,
        submitHandleReset,
        isLoading,
        isAnimating,
        setIsAnimating,
        isEnd
    };
}