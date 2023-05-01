import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import {
  Link
} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logo from '../../assets/images/logos/logo.png'
import firebase from "firebase";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
    },
  justify: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-around",
    }
  },
  menuButton: {
    marginRight: theme.spacing(0.5)
  },
  title: {
      display: "flex",
      // marginTop: "15px",
      textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    }
  },
  name: {
    marginLeft: "15px"
  },
  headerOptions: {
    display: "flex",
    marginLeft: "auto"
  },
  liitem:{
    marginLeft: "5px",
    marginRight: "5px",
    paddingLeft: "20px", 
    paddingRight: "20px", 
  }
}));

const Header = props => {
  var user = firebase.auth().currentUser
  // console.log(user)
  const { history, location } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    firebase.auth().signOut();
    localStorage.clear()
    // localStorage.removeItem("userId"); 
    window.location.reload(false)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL, menuTitle) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "Vet Service",
      pageURL: "/vetService/vetDetail"
    },
    // {
    //   menuTitle: "Blogs",
    //   pageURL: "/blogs"
    // },
    // {
    //   menuTitle: "About Us",
    //   pageURL: "/aboutus"
    // },
    // {
    //   menuTitle: "Contact",
    //   pageURL: "/contact"
    // },
    {
      menuTitle: "Profile",
      pageURL: "/user/dashboard?tab=Profile"
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0} color="secondary" style={{ paddingBottom: '13px' }}>
        <Toolbar className={classes.justify}>    
        <Link to="/">
          <div className={classes.title}>
                    <img src={logo} alt='PetC logo' title='PetC logo' style={{width:'70px' , height:'30px'}} />
                </div>   
          </Link>     
          {isMobile ? (
            <div>
            {/* {user?null:
              <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                
                  <MenuItem className={classes.liitem} variant="contained" color="primary"
                onClick={() => handleButtonClick("/login")}
              >
                <Typography variant='p' style={{ color: theme.palette.text.main }}>Sign in</Typography>
                </MenuItem>
                <MenuItem className={classes.liitem} variant="outlined" color="primary"
                onClick={() => handleButtonClick("/signup")}
              >
                <Typography variant='p' color='primary'>Register</Typography>
                </MenuItem>
                  
              </Menu>
            
              
                  </div>
              } */}
            
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
              
                {menuItems.map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL, menuTitle)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })} 
                
                {user?<MenuItem onClick={handleLogout} >Logout</MenuItem>:<>
                <MenuItem onClick={() => handleButtonClick("/login")} style={{ color: theme.palette.secondary.main }}>Sign in</MenuItem> 
                <MenuItem onClick={() => handleButtonClick("/signup")} style={{ color: theme.palette.secondary.main }}>Register</MenuItem>
                </>}
                
              </Menu>
              
            </div>
              
          ) : (
            <div className={classes.headerOptions}>
            {menuItems.filter(item=>item.menuTitle!="Profile").map(menuItem => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <Button onClick={() => handleMenuClick(pageURL)} style={(location.pathname)===(pageURL)?{color: theme.palette.primary.main}:{color: theme.palette.text.main}}>
                      {menuTitle}
                    </Button>
                  );
                })}
              {
                user ? 
                <div style={{ marginLeft: '5px'}}>
                  <IconButton color="primary" href="/user/dashboard?tab=Profile" style={{ marginRight: '5px'}}><AccountCircleIcon /></IconButton>
                  <Button onClick={handleLogout} variant="outlined" color="primary" >Logout</Button> 
                </div>
                : 
                <div>
                  <Button className={classes.liitem} variant="contained" color="primary"
                onClick={() => handleButtonClick("/login")}
              >
                <Typography variant='p' style={{ color: theme.palette.text.main }}>Sign in</Typography>
                </Button>
                <Button className={classes.liitem} variant="outlined" color="primary"
                onClick={() => handleButtonClick("/signup")}
              >
                <Typography variant='p' color='primary'>Register</Typography>
                </Button>
                
                  </div>
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
