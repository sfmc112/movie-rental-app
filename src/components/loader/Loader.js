import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Loader = ({ withBackdrop }) => {
    const classes = useStyles();

    return withBackdrop ? (
        <Backdrop className={ classes.backdrop } open timeout={ 5000 }>
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : (
        <CircularProgress color="inherit" size={ '1.5rem' } />
    );
};

export default Loader;
