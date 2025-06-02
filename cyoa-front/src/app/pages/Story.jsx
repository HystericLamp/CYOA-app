import React from "react";
import StoryBoard from "../../features/story/components/StoryBoard";
import ChoicesForm from "../../features/story/components/ChoicesForm";
import { StoryProvider } from "../../features/story/context/StoryContext";

const Story = () => {
    // TODO: Finish styling the components
    // Add type-writer animations

    return(
        <StoryProvider>
            <div className="min-h-screen pt-16 flex flex-col items-center py-12 px-4">
                {/* Story Board */}
                <h2 className="text-4xl font-bold text-primary mb-8">
                    🌟 Your Story Unfolds
                </h2>

                <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl transition-all duration-500">
                    <StoryBoard />
                </div>

                {/* Choices Form */}
                <h2 className="text-3xl font-bold text-primary mt-8">
                    💡 Select your Choice
                </h2>

                <div className="bg-white rounded-3xl shadow-lg mt-6 w-full max-w-2xl transition-all duration-500">
                    <ChoicesForm />
                </div>
            </div>
        </StoryProvider>
    );
};

export default Story;