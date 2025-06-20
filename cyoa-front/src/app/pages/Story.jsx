import React from "react";
import StoryBoard from "../../features/story/components/StoryBoard";
import ChoicesForm from "../../features/story/components/ChoicesForm";
import ResetForm from "../../features/story/components/ResetForm";
import { StoryProvider } from "../../features/story/context/StoryContext";

const Story = () => {
    return(
        <StoryProvider>
            <div className="min-h-screen pt-16 flex flex-col items-center py-12 px-4">
                {/* Story Board */}
                <div className="w-full max-w-2xl flex items-center justify-between">
                    <h2 className="text-4xl font-bold text-primary">
                        🌟 <span className="header-title">Your Story Unfolds</span>
                    </h2>
                    <ResetForm />
                </div>

                <StoryBoard />

                {/* Choices Form */}
                <h2 className="text-3xl font-bold text-primary mt-8">
                    💡 <span className="header-title">Select your Choice</span>
                </h2>

                <ChoicesForm />
            </div>
        </StoryProvider>
    );
};

export default Story;