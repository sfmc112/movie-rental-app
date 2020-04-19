import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../../theme/styles';

const UpArrowMessage = ({ children, classes }) => (
    <main className={ classes.main }>
        <Paper className={ classes.paper }>
            <ArrowUpwardIcon className={ classes.icon } fontSize={ 'large' } color={ 'primary' } />
            { children }
        </Paper>
    </main>
);

export default withStyles(styles)(UpArrowMessage);
