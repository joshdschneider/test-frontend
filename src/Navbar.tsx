import React from 'react';
import { withAuthInfo, useLogoutFunction, useRedirectFunctions, WithAuthInfoProps, User } from '@propelauth/react';
import './Navbar.css';

type AccountProps = {
  user: User
}

function Account({ user }: AccountProps) {
  const { redirectToAccountPage } = useRedirectFunctions();
  const logout = useLogoutFunction();

  return (
    <div className='account'>
      <button onClick={() => logout(true)}>Logout</button>
      <div className='avatar' onClick={redirectToAccountPage}>
        <img src={user ? user.pictureUrl : ''} alt='user' />
      </div>
    </div>
  );
}

function Login() {
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions();

  return (
    <div className='login'>
      <button onClick={redirectToSignupPage}>Signup</button>
      <button onClick={redirectToLoginPage}>Login</button>
    </div>
  );
}

function Navbar({ isLoggedIn, user }: WithAuthInfoProps) {
  return (
    <div className='Navbar'>
      <div className='logo'>
        <h5>Example</h5>
      </div>
      {isLoggedIn ? <Account user={user} /> : <Login />}
    </div>
  );
}

export default withAuthInfo(Navbar);
