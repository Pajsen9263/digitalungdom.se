import { Route, Switch, useHistory } from 'react-router-dom';

import ProfilePage from 'features/profile';
import React from 'react';

const About = React.lazy(() => import('pages/About'));
const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));
const Startpage = React.lazy(() => import('pages/Startpage'));
const VerifyEmailLink = React.lazy(() => import('features/auth/VerifyEmailLink'));
const Settings = React.lazy(() => import('features/settings'));

function Router(): React.ReactElement {
  const history = useHistory();
  return (
    <React.Suspense fallback={'Loading...'}>
      <Switch>
        <Route path="/logga-in">
          <Login onSuccess={(): void => history.push('/')} />
        </Route>
        <Route path="/bli-medlem">
          <Register onSuccess={(): void => history.push('/')} />
        </Route>
        <Route path="/@:username">
          <ProfilePage />
        </Route>
        <Route path="/verify/:token">
          <VerifyEmailLink />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/settings/:section">
          <Settings />
        </Route>
        <Route exact path="/">
          <Startpage />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default Router;
