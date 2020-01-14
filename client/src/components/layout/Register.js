

import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button';
import { register } from '../../actions/auth'
import {Redirect} from 'react-router-dom'


const useStyles = makeStyles(theme => ({

    margin: {
        margin: theme.spacing(1),
    },

}));

const Register = ({register,isAuthenticated}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onClick = e => {
        console.log(formData);
        register({ name, email, password });
    }

     //Redirect if LOgged in
     if (isAuthenticated) {
        return <Redirect to="/" />
    }
    return (
        <div id="Form">
            <div>
                <h1>Register User</h1><br />
                <FormControl className={classes.margin}>
                    <TextField
                        id="standard-helperText"
                        label="Name"
                        defaultValue=""
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}

                    />

                    <TextField
                        id="standard-helperText"
                        label="Email"
                        defaultValue=""
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}

                    // helperText="Enter a valid email here"
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




                <Button onClick={e => onClick(e)} variant="contained" color="primary" id="btn" > Register</Button>
            </div>
        </div>
    );
}
Register.propTypes = {

    register: PropTypes.func.isRequired,

}


const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
    })

export default connect(mapStateToProps, { register })(Register)