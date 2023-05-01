import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { IconButton } from '@mui/material';
import { useTheme } from "@material-ui/core/styles";
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const options = [
  {
    name:"Homepage",
    pageLink:"Profile",
    icon:<Home />
  },
  {
    name:"Appointments",
    pageLink:"Appointments",
    icon:<Bookmark />
  },
  {
    name:"Settings",
    pageLink:"Settings",
    icon:<Settings />
  },

]

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    // backgroundColor: theme.palette.secondary.main,
    position: "sticky",
    paddingLeft: '5px',
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
    //   border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  selectedItem:{
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    function call(x){
        console.log(x)
        props.change(x)
    }

  const classes = useStyles();
  return (
    <div className={classes.container}>
      {options.map((option)=> (
      <div className={option.pageLink===props.page?classes.selectedItem:classes.item} onClick={()=>{call(option.pageLink)}}>
        <IconButton className={classes.icon} style={option.pageLink===props.page?{ color: theme.palette.primary.main }:{ color: 'black' }}>{option.icon}</IconButton>
        <h4 className={classes.text}>{option.name}</h4>
      </div>))}
    </div>
  );
};

export default Leftbar;