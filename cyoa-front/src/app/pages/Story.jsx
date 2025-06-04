import React from "react";
import StoryBoard from "../../features/story/components/StoryBoard";
import ChoicesForm from "../../features/story/components/ChoicesForm";
import { StoryProvider } from "../../features/story/context/StoryContext";

const Story = () => {
    // TODO:
    // Add type-writer animations
    // Add loading states
    // Refactor
    // Make sure OpenAI will end the story

    return(
        <StoryProvider>
            <div className="min-h-screen pt-16 flex flex-col items-center py-12 px-4">
                {/* Story Board */}
                <h2 className="text-4xl font-bold text-primary mb-8">
                    🌟 <span className="header-title">Your Story Unfolds</span>
                </h2>

                <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl transition-all duration-500">
                    <StoryBoard />
                </div>

                {/* Choices Form */}
                <h2 className="text-3xl font-bold text-primary mt-8">
                    💡 <span className="header-title">Select your Choice</span>
                </h2>

                <div className="bg-white rounded-3xl shadow-lg mt-6 w-full max-w-2xl transition-all duration-500">
                    <ChoicesForm />
                </div>
            </div>
        </StoryProvider>
    );
};

export default Story;