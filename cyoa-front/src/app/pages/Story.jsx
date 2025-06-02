import React from "react";
import StoryBoard from "../../features/story/components/StoryBoard";
import ChoicesForm from "../../features/story/components/ChoicesForm";
import { StoryProvider } from "../../features/story/context/StoryContext";

const Story = () => {
    return(
        <StoryProvider>
            <div className="min-h-screen flex flex-col items-center py-10 px-4">
                <h2 className="text-3xl font-bold mb-6">
                    Story Board
                </h2>

                {/* Story Board */}
                <div className="bg-white rounded-xl shadow-md p-6 max-w-xl w-full text-center">
                    <StoryBoard />
                </div>

                {/* Choices Form */}
                <div className="bg-white rounded-xl shadow-md max-w-xl text-center">
                    <ChoicesForm />
                </div>
            </div>
        </StoryProvider>
    );
};

export default Story;