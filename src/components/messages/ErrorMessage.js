import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../theme/styles';

const ErrorMessage = ({ children, classes }) => (
    <main className={ classes.main }>
        <Paper className={ classes.paper }>
            <ErrorOutlineIcon className={ classes.icon } fontSize={ 'large' } color={ 'primary' } />
            { children }
        </Paper>
    </main>
);

export default withStyles(styles)(ErrorMessage);
