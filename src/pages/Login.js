import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';

import { TITLE_ICON, APP_ID, LOGIN_STORAGE_KEY } from '../common/constants';

function Login() {

  const [login, setLogin] = useState(localStorage.getItem(LOGIN_STORAGE_KEY) === 'authorized');
  const [data, setData] = useState({});

  const responseFacebook = response => {
    localStorage.setItem('userdata', JSON.stringify(data));
    setData(response);
    if (response.accessToken) {
      setLogin(true);
      localStorage.setItem(LOGIN_STORAGE_KEY, 'authorized');
    } else {
      setLogin(false);
      localStorage.removeItem(LOGIN_STORAGE_KEY);
    }

  }

  if (!data.name) {
    const userData = localStorage.getItem('userdata');
    if (userData) {
      data.name = JSON.parse(userData).name;
    }
  }

  return (
    <>
      <div>
        {!login &&
          <FacebookLogin
            cssClass='facebook'
            appId={APP_ID}
            autoLoad={true}
            fields='name,email,picture'
            scope='public_profile,user_friends'
            callback={responseFacebook}
            icon={TITLE_ICON}
          />
        }

        {login &&
          <div className='facebook_user-info'>
            <p>{data.name}</p>
          </div>
        }
      </div>
    </>
  )
}

export default Login;
