import React, { useEffect, useState } from 'react';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../theme/styles';
import firebase from '../../firebase';
import { Loader } from '../../components';

const Register = ({ classes }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const history = useHistory();

    // Make the error disappear after 5 seconds
    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, [error]);

    // Register action
    const onRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!name || !email || !password || !confirmPassword){
            setError('All fields are mandatory.');
        } else if (password !== confirmPassword){
            setError('The passwords do not match.');
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => history.replace('/login'))
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.message);
                });
        }
    };

    return (
        <main className={ classes.main }>
            <Paper className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create an account
                </Typography>
                <form className={ classes.form } onSubmit={ e => e.preventDefault() && false }>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name" autoComplete="off" autoFocus value={ name } onChange={ e => setName(e.target.value) } />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" value={ email } onChange={ e => setEmail(e.target.value) } />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="off" value={ password } onChange={ e => setPassword(e.target.value) } />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Confirm Password</InputLabel>
                        <Input name="confirmPassword" type="password" id="confirmPassword" autoComplete="off" value={ confirmPassword } onChange={ e => setConfirmPassword(e.target.value) } />
                    </FormControl>

                    { error && <div className={ classes.error }>{ error }</div> }
                    { isLoading && <div className={ classes.centered }><Loader /></div> }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={ isLoading }
                        color="primary"
                        onClick={ onRegister }
                        className={ classes.submit }>
                        Register
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={ isLoading }
                        color="secondary"
                        component={ Link }
                        to="/login"
                        className={ classes.submit }>
                        Go back to Login
                    </Button>
                </form>
            </Paper>
        </main>
    );
};

export default withStyles(styles)(Register);
