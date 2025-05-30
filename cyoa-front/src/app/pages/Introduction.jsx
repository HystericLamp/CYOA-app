import React, { useEffect, useState } from 'react';
import { getIntro } from '../../features/intro/api/introService';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Introduction = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const data = await getIntro();
        setMessage(data.message);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching intro:', error);
      }
    };

    fetchIntro();
  }, []);

  return (
    <div className="min-h-screen">
      <main className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
          
          {/** Introduction Content */}
          <h2 className="text-xl font-bold mb-4">
            Create your Own Adventure
          </h2>

          <p className="text-gray-700">
            Welcome to my CYOA app! <br />
            This is a simple CYOA app that allows you to create your own
            adventure.

            {/** For Testing Backend Fetch */}
            {message === 'Ok' && status === 'active' ? (
              <CheckIcon className="w-6 h-6 text-green-500" />
            ) : (
              <XMarkIcon className="w-6 h-6 text-red-500" />
            )}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Introduction; 