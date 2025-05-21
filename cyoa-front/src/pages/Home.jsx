import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/** Introduction Content */}
      <main className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">
            Create your Own Adventure
          </h2>
          <p className="text-gray-700">
            Welcome to my CYOA site! <br />
            This is a simple CYOA site that allows you to create your own
            adventure.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;