import React from 'react';
import './EventList.css';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EventCarousal from '../Events/EventCarousal';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import EventCards from './EventList_Cards';


const Sidebar=()=>{
    const drawerWidth = 324;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
       <Divider />
      <List>
        <p style={{fontSize:"18px", fontWeight:"600",marginTop:"30px",paddingLeft:"20px"}}>Browse Events</p>
        {['Mumbai', 'Bengaluru', 'Chennai','London','Washington DC', 'New york'].map((text, index) => (
          <ListItem button key={text}>
              <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <p style={{fontSize:"18px", fontWeight:"600",marginTop:"30px",paddingLeft:"20px"}}>Browse By Categories</p>
      <List>
        {['Agriculture & Foresty', 'Animals & Pets', 'Arts & Crafts','Auto & Automotive','Baby,Kids & Maternity','Banking & Finance','Building & Construction','Business Services' ].map((text, index) => (
          <ListItem button key={text}>
              <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <br/>
      <Button id="see_cat" variant="contained" size="large" color="primary" className={classes.margin}>See All Categories</Button>
    </div>
  );

  return (
    <>
     <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
     
    </div>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};
}

export default Sidebar;
