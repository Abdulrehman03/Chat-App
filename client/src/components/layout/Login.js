
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import {Redirect} from 'react-router-dom'




const useStyles = makeStyles(theme => ({

    margin: {
        margin: theme.spacing(1),
    },

}));

const Login = ({login,isAuthenticated}) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({

        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onClick = e => {
        console.log("Login Succes");
        login({email,password});
    }

    if(isAuthenticated){
        return <Redirect to="/" />
    } 
    return (
        <div id="Form">
            <div>
                <h1>Login User</h1><br />
                <FormControl className={classes.margin}>

                    <TextField
                        id="standard-helperText"
                        label="Email"
                        defaultValue=""
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    
                    />

                </FormControl><br />
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </FormControl><br />




                <Button onClick={e => onClick(e)} variant="contained" color="primary" id="btn" > Login</Button>
            </div>
        </div>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)