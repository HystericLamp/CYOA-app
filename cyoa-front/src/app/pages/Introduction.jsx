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
    <div className="min-h-screen flex items-center justify-center">
      <main className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-white/50">
        {/** Introduction Content */}
        <h2 className="text-3xl font-extrabold mb-4 text-primary">
          Create your Own Adventure
        </h2>

        <p className="text-gray-800 text-lg">
          Welcome to my CYOA app! <br />
          This is a simple CYOA app that allows you to create your own
          adventure.
        </p>

        <div className='mt-4'>
          {/** For Testing Backend Fetch */}
          {message === 'Ok' && status === 'active' ? (
            <CheckIcon className="w-8 h-8 text-green-500 animate-pulse inline" />
          ) : (
            <XMarkIcon className="w-8 h-8 text-red-500 inline" />
          )}
        </div>
      </main>
    </div>
  );
};

export default Introduction; 