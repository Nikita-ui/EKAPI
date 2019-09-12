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
import EventDetailCarousal from '../Events/EventDetailCarousal';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import EventCards from './EventList_Cards';
import organiser from '../../Assets/organiser.jpg';
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
      <main className={classes.content}>
      <EventDetailCarousal/>
      <div id="cat_btn">
        <Button variant="contained" size="large" color="primary" className={classes.margin}>Agriculture &amp; Foresty</Button>
        <Button variant="contained" size="large" color="primary" className={classes.margin}>Animals &amp; Pets</Button>
        <Button variant="contained" size="large" color="primary" className={classes.margin}>Apparel &amp; Clothing</Button>
        <Button variant="contained" size="large" color="primary" className={classes.margin}>Arts &amp; Crafts</Button>
        <Button variant="contained" size="large" color="primary" className={classes.margin}>Auto &amp; Automotive</Button>
        </div>
        <div class="container-fluid">
          <div id="filter_div" class="row">
            <span style={{fontSize:"20px",fontWeight:"600",pull:"left"}}>Upcoming Events</span> 
     
           <Button id="filter_btn" variant="contained" color="primary"  size="large" className={classes.button}>
            Filter
            <SearchIcon id="filtericon" className={classes.rightIcon} />
            </Button>
           </div>
           <div class="row" id="card_div">  <EventCards/><EventCards/><EventCards/></div>
           <div class="row" id="card_div">  <EventCards/><EventCards/><EventCards/></div>
           <div class="row" id="card_div">  <EventCards/><EventCards/><EventCards/></div>
        
      </div>
      </main>
        <main style={{display:"none"}} className={classes.content}>
     
     <EventCarousal/>
          
       <div class="container-fluid" style={{marginTop:"30px"}}>
            <div>
              <p className="Highlights">Highlights</p>
              <ul>
              <li>The shows will be collocated with Apparel Sourcing, Avantex, Leatherworld and Shawls & Scarves Paris</li>
              <li>We reserve prospective opportunities, creations, services for active and profitable business</li>
              </ul>
          </div>
          <div>
              <p className="Highlights">Timings</p>
              <ul type="none">
              <li> 9:00 AM - 6:00 PM (Sep 16 - Sep 18) (Business)</li>
              <li> 9:00 AM - 4:30 PM (Sep 19) (Business)</li>
              </ul>
            </div>
            
          <div class="row">
            <div class="col-md-6">
              <p className="Highlights">Entry Fees</p>
              <ul type="none">
              <li>Free Ticket For Industry Professionals</li>
              <li>Exhibit Booth Cost Starts from 1073 USD</li>
              </ul>
            </div>
            <div class="col-md-6">
              <p className="Highlights">Participants</p>
              <ul type="none">
              <li>29000 Visitors</li>
              <li>1850 Exhibitors</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <p className="Highlights">Category & Type</p>
              <ul type="none">
              <li>Trade Show</li>
              <li>Apparel & Clothing</li>
              <li>Fashion & Beauty</li>
              </ul>
            </div>
            <div class="col-md-6">
              <p className="Highlights">Official Links</p>
              <Button id="website" variant="contained" size="large" color="primary" className={classes.margin}>Website</Button><br/>
              <Button id="contacts" variant="contained" size="large" color="primary" className={classes.margin}>Contacts</Button>
            </div>
          </div>
          <div>
            <p className="Highlights">Organizer</p>
            <img src={organiser} alt="organiser"/><span style={{color: "#045488", fontSize: "16px", fontWeight:"600"}}>Jayanita Exports</span>
          </div>
          <div class="row" style={{justifyContent:"center"}}>
          <Button variant="contained" style={{backgroundColor:" #075776",borderRadius:"27px",width:"243px", Height:"50px",fontSize:"40px",fontWeight:"600"}} size="large" color="secondary">INTRESTED</Button>
          </div>
     </div>
     </main>
        }
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

export default ResponsiveDrawer;
