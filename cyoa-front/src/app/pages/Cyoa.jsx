import React, { useState } from "react";

const Cyoa = () => {
    // TODO: Make buttons based on the number of choices available
    // Make buttons hold choices
    // Update storyboard
    const [story, setStory] = useState("You are in a dark forest. Do you go left or right?");
    const [userInput, setUserInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Placeholder logic — customize as needed
        if (userInput.toLowerCase().includes("left")) {
            setStory("You walk left and encounter a peaceful river.");
        } else if (userInput.toLowerCase().includes("right")) {
            setStory("You head right and find a mysterious cave.");
        } else {
            setStory("That choice isn't clear. Try 'left' or 'right'.");
        }
        
        //setStory(userInput);
        setUserInput("");
    };

    return(
        <div className="min-h-screen flex flex-col items-center py-10 px-4">
            <h2 className="text-3xl font-bold mb-6">
                Story Board
            </h2>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-xl w-full text-center">
                {/* Story Board */}
                <p className="text-gray-800 mb-6">
                    {story}
                </p>

                {/* Input Field */}
                <form onSubmit={handleSubmit} className="mb-6">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your choice..."
                        className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </form>
            </div>
        </div>
    );
};

export default Cyoa