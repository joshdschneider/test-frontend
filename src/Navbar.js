import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';
import './Navbar.css';

function Account({ user }) {
  const { redirectToAccountPage } = useRedirectFunctions();
  const logout = useLogoutFunction();

  return (
    <div className='account'>
      <button onClick={() => logout()}>Logout</button>
      <div className='avatar' onClick={redirectToAccountPage}>
        <img src={user.pictureUrl} alt='user' />
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

function Navbar({ isLoggedIn, user }) {
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
