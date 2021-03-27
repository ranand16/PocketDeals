// Dependencies
import React, { useCallback } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

// Containers
// import ProductDetailsNavigator from '../../components/Product/components/ProductDetailsRouter';
import PrivateRoute from '../../config/private-route';
import { ROUTES } from '../../config/routes.config';
import WithHeader from '../../shared/WithHeader/index';

const AppNavigator: React.FC = () => {
  const { pathname } = useLocation();

  const defaultUrl = useCallback(() => {
    return "/"
  }, []);


  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route path={ROUTES.map((route) => route.routeProps.path)}>
        <WithHeader>
          <Switch>
            {
              ROUTES.map((route, i)=>
                <PrivateRoute key={i} {...route.routeProps} /> 
              )
            }
          </Switch>
        </WithHeader>
      </Route>
      <Redirect exact from="/" to={defaultUrl()} />

    </Switch>
  );
};

export default AppNavigator;
