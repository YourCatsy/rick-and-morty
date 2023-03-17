import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

import { TITLE_ICON, APP_ID, LOGIN_STORAGE_KEY } from '../common/constants'

function Login() {
  const [login, setLogin] = useState(localStorage.getItem(LOGIN_STORAGE_KEY));
  const [data, setData] = useState({});

  const responseFacebook = response => {
    setData(response)
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
    <div>
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
        <div>
          <p>{data.name}</p>
          <p>{data.email}</p>
        </div>
      )}
</div>
    </>
  )
}

export default Login;
