//import Link from 'next/link';
import Router from 'next/router';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'

const LoginGugelNotUse = () => {

  const [nextUser, setNextUser] = useState({})

  const handleCallbackResponse = (credentialResponse) => {
    console.log('Encoded JWT Id Token: ' + credentialResponse.credential)
    
    var userObject = jwt_decode(credentialResponse.credential)
    console.log(userObject)

    const tokenId = credentialResponse.credential;
    const user = { tokenId };

    loginWithGoogle(user).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });

  }

  useEffect(() => {
    // global gugel
    google.accounts.id.initialize({
      client_id: `${GOOGLE_CLIENT_ID}`,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  // if we have no user: sign in button
  // if we have a user: show the logout button

  return (
    <div className="pb-3">
      <div id='signInDiv'></div>
      {nextUser &&
        <div>
          <img src={nextUser.picture}></img>
          <h3>{nextUser.name}</h3>
        </div>}
    </div>
  );

}

export default LoginGugelNotUse;