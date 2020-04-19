import React from 'react';
import ReactDOM from 'react-dom';
import { RentalsProvider, UserProvider } from './contexts';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Root = () => (
    <UserProvider>
        <RentalsProvider>
            <App />
        </RentalsProvider>
    </UserProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
