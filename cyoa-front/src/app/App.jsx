import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Introduction from './app/pages/Introduction';
import Story from './app/pages/Story';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
    console.error('VITE_API_BASE_URL is not defined');
    throw new Error('Backend URL is not configured');
}

function App() {
  useEffect(() => {
    fetch(API_BASE_URL).catch(() => {
      // Silently ignore errors, backend might be waking up
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Introduction />} />
        <Route path="story" element={<Story />} />
      </Route>
    </Routes>
  );
}

export default App;
