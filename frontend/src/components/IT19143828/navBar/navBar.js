import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SettingsPower from "@material-ui/icons/SettingsPower";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import GroupIcon from "@material-ui/icons/Group";
import StorageIcon from "@material-ui/icons/Storage";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DescriptionIcon from "@material-ui/icons/Description";
import HouseIcon from "@material-ui/icons/House";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { Row, Container, Col } from "react-bootstrap";
import {} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Drawer, List } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  NavColor: {
    backgroundColor: "rgb(2, 3, 43)",
  },
}));

export default function NavBar() {
  let history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const openMenu = Boolean(anchorEl);

  // };

  useEffect(() => {
    const getUserData = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    getUserData();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logOut = () => {
    localStorage.clear();
    user = null;
    history.push("/");
    window.location.reload();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log(user.eid);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.NavColor}>
        <Toolbar>
          {user != null ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Back"
                onClick={history.goBack}
                edge="start"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                href="/home"
              >
                <LocalLibraryIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                LMS
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {!user.formData.proPic ? (
                      <AccountCircle />
                    ) : (
                      <img
                        src={user.formData.proPic}
                        className="rounded-circle"
                        width="40px"
                        height="40px"
                      ></img>
                    )}
                    &nbsp;
                    <Typography>{user.formData.name}</Typography>
                  </IconButton>
                  <Menu
                    style={{ marginTop: "50px", width: "500px" }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    open={openMenu}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/profile"
                    >
                      <AccountCircle /> &nbsp; Profile
                    </MenuItem>
                    <hr></hr>
                    <MenuItem className="text-danger" onClick={logOut}>
                      <SettingsPower /> &nbsp; Log Out
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
            <Typography>Back</Typography>
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HouseIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/viewMember">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Member Management</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/barrow">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText>Borrow Management</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/book">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText>Book Management</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/staff">
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText>Staff Management</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/viewReservation">
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText>Reservation Management</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/reports">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}
