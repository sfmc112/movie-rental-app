import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts';
import isEmpty from 'lodash/isEmpty';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <Route
            { ...rest }
            render={ routeProps => !isEmpty(currentUser) ? (
                <RouteComponent { ...routeProps }/>
            ) : (
                <Redirect to={ '/login' }/>
            ) } />
    );
};

export default PrivateRoute;
