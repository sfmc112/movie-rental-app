import React from 'react';
import { ErrorMessage } from '../../components';

const NotFound = () => (
    <ErrorMessage>
        <div>We couldn't find the page you requested.</div>
        <div>Please check the url and try again.</div>
    </ErrorMessage>
);

export default NotFound;
