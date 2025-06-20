import React, { useEffect, useState } from 'react';
import { getIntro } from '../../features/intro/api/introService';
import { fetchWithWakeup } from '../../utils/fetchWithWakeup';

const Introduction = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const data = await fetchWithWakeup(getIntro, { retries: 1, timeout: 15000 });
        setMessage(data.message);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching intro:', error);
        setError('Unable to connect to the server. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchIntro();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-white/50">
        {/** Introduction Content */}
        <h2 className="text-3xl font-extrabold mb-4 text-primary header-title">
          Create your Own Adventure
        </h2>

        <p className="text-gray-800 text-lg">
          Welcome to my CYOA app! <br />
          This is a simple CYOA app that allows you to create your own
          adventure.
        </p><br/>

        {loading ? (
          <div className="text-blue-600 font-medium animate-pulse">
            Waking up the server, please wait...
          </div>
        ) : error ? (
          <div className="text-red-600 font-medium">
            {error}
          </div>
        ) : (
          <div className="text-green-600 font-medium">
            App is ready! Message: {message}, Status: {status}
          </div>
        )}
      </main>
    </div>
  );
};

export default Introduction; 