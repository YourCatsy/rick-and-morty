import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import { Characters } from './Characters';
import { Character } from './Character';
import { Notfoundpage } from './Notfoundpage';
import { Layout } from '../components/Layout';
import {TITLE_ICON, APP_ID, LOGIN_STORAGE_KEY} from '../common/constants'

function Login () {
  const [login, setLogin] = useState(localStorage.getItem(LOGIN_STORAGE_KEY));

  const responseFacebook = response => {

    if (response.accessToken) {
      setLogin(true);
      localStorage.setItem(LOGIN_STORAGE_KEY, true)
    } else {
      setLogin(false);
      localStorage.removeItem(LOGIN_STORAGE_KEY)
    }
  }

  return (
    <>
      {!login && (
        <FacebookLogin
        cssClass='facebook'
          appId={APP_ID}
          autoLoad={true}
          fields='name,email,picture'
          scope='public_profile,user_friends'
          callback={responseFacebook}
          icon={TITLE_ICON}
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
