import { createContext, useContext } from "react";
import { useStory } from "../hooks/useStory";

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
    const storyData = useStory();
    return (
        <StoryContext.Provider value={storyData}>
            {children}
        </StoryContext.Provider>
    );
};

export const useStoryContext = () => {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error("useStoryContext must be used within a StoryProvider");
    }

    return context;
};