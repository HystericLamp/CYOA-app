import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import Layout from './components/Layout';
import Introduction from './app/pages/Introduction'
import Cyoa from './app/pages/Cyoa'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Introduction />} />
          <Route path="story" element={<Cyoa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
