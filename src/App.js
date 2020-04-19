import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as routes from './constants';
import { Header, PrivateRoute } from './components';
import * as pages from './pages';
import styles from './App.module.css';

const App = () => (
    <Router>
        <div className={ styles.App }>
            <Header />
            <div className={ styles.ScrollableBody }>
                <Switch>
                    <Route exact path={ routes.LANDING } component={ pages.Homepage } />
                    <Route path={ routes.POPULAR_MOVIES } component={ pages.MovieList } />
                    <Route path={ routes.UPCOMING_MOVIES } component={ pages.MovieList } />
                    <Route path={ routes.SEARCH_MOVIES } component={ pages.MovieList } />
                    <Route path={ routes.MOVIE_DETAILS } component={ pages.MovieDetails } />
                    <Route path={ routes.SIGN_IN } component={ pages.Login } />
                    <Route path={ routes.SIGN_UP } component={ pages.Register } />
                    <PrivateRoute path={ routes.PROFILE } component={ pages.Profile } />
                    <Route component={ pages.NotFound } />
                </Switch>
            </div>
        </div>
    </Router>
);

export default App;
