import React, { useContext, useEffect, useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import styles from '../../theme/styles';
import { PROFILE } from '../../constants';
import firebase from '../../firebase';
import { UserContext } from '../../contexts';
import { Loader } from '../../components';

const Login = ({ classes }) => {
    const { currentUser } = useContext(UserContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const history = useHistory();

    const login = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => history.replace(PROFILE))
            .catch((error) => {
                setIsLoading(false);
                setError(error.message);
            });
    };

    useEffect(() => {
        !isEmpty(currentUser) && history.replace(PROFILE);
    }, [ currentUser, history ]);

    // Make the error disappear after 5 seconds
    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, [error]);

    return (
        <main className={ classes.main }>
            <Paper className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login into your account
                </Typography>
                <form className={ classes.form } onSubmit={ e => e.preventDefault() && false }>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={ email } onChange={ e => setEmail(e.target.value) } />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="off" value={ password } onChange={ e => setPassword(e.target.value) } />
                    </FormControl>
                    { error && <div className={ classes.error }>{ error }</div> }
                    { isLoading && <div className={ classes.centered }><Loader /></div> }
                    <Button
                        type="submit"
                        fullWidth
                        disabled={ isLoading }
                        variant="contained"
                        color="primary"
                        onClick={ login }
                        className={ classes.submit }>
                        Login
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={ Link }
                        disabled={ isLoading }
                        to="/register"
                        className={ classes.submit }>
                        Register
                    </Button>
                </form>
            </Paper>
        </main>
    );
};

export default withStyles(styles)(Login);
