import Router from 'next/router';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import jwt_decode from 'jwt-decode'

const LoginGoogle = () => {
  const responseGoogle = credentialResponse => {
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
  };

  return (
    <div className="pb-3">
      <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('Login Failed');
          }} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginGoogle;