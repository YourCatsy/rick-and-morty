import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import { Characters } from './pages/Characters';
import { Character } from './pages/Character';
import { Notfoundpage } from './pages/Notfoundpage';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Login />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Characters />} />
          <Route path=':id' element={<Character />} />
          <Route path='*' element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
