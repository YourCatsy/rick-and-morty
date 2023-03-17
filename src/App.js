import React from 'react';
import { Routes, Route } from 'react-router-dom';


import { Characters } from './Characters';
import { Character } from './Character';
import { Notfoundpage } from './Notfoundpage';
import { Layout } from '../components/Layout';
function App() {
  return (
    <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Characters />} />
      <Route path=':id' element={<Character />} />
      <Route path='*' element={<Notfoundpage />} />
    </Route>
  </Routes>
  );
}

export default App;
