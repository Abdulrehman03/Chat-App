import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();
  const onClick = (e) => {
    if (e.target.innerText == "REGISTER") {
      window.location.pathname = "/register"
    }
    else {
      window.location.pathname = "/login"

    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Chat Zone
          </Typography>

          {isAuthenticated == false && window.location.pathname != '/admin' && <Button onClick={e => onClick(e)} color="inherit">Login</Button>}
          {isAuthenticated == false && window.location.pathname != '/admin' && <Button onClick={e => onClick(e)} color="inherit">Register</Button>}
          {isAuthenticated && window.location.pathname != '/admin' && <Button onClick={logout} color="inherit">Logout</Button>}


        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);