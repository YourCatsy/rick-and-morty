import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import { Characters } from './Characters';
import { Character } from './Character';
import { Notfoundpage } from './Notfoundpage';
import { Layout } from '../components/Layout';

function Login () {
  const [login, setLogin] = useState(localStorage.getItem('login') === 'true');

  const responseFacebook = response => {

    if (response.accessToken) {
      setLogin(true);
      localStorage.setItem('login', 'true')
    } else {
      setLogin(false);
      localStorage.removeItem('login')
    }
  }

  return (
    <>
      {!login && (
        <FacebookLogin
        cssClass='facebook'
          appId='6349609461773551'
          autoLoad={true}
          fields='name,email,picture'
          scope='public_profile,user_friends'
          callback={responseFacebook}
          icon='fa-facebook'
        />
      )}

      {login && (
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Characters />} />
            <Route path=':id' element={<Character />} />
            <Route path='*' element={<Notfoundpage />} />
          </Route>
        </Routes>
      )}
    </>
  )
}

export default Login;
