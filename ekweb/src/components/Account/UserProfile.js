import React,{Component} from 'react';
import './UserProfile.css';
import ProfileHeader from '../Home/Header/ProfileHeader';
import Card from 'react-bootstrap/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import EventListCards from '../Events/EventList_Cards';
class UserProfile extends Component {
    
    render(){
        return(
            <>
            <div>
            <ProfileHeader/>
            </div>
            <div class="container">
            <p>About</p>   
                <div id="about_div" class="row">
                 <Card>
                 <EditIcon/>
                  <Card.Body>
                 
                      <Card.Text>
                      <div id="icons1">
                      <AccountCircleIcon/>Narender Modi
                      <EmailIcon/>modi@gmail.com
                      <PhoneIcon/>9818765443
                      <LinkIcon/>www.exikonnect.co.in
                      </div>
                      </Card.Text>
                  
                </Card.Body>
                    
                   <Card.Body>
                      
                    <Card.Text>
                        <div id="icons2">
                            <BusinessCenterIcon/>Times Internet Ltd.
                            <StarIcon/>Favourites
                            <BookmarkIcon/>Bookmarks
                          </div>
                    </Card.Text>
                    </Card.Body>
                </Card>
                </div>
            
            
                <p>Preferences</p>   
                <div class="row">
                    <Card>
                        <Card.Body id="user_prf">
                        <div className="profile">
                            <Button variant="contained" size="large" color="primary" >Agriculture &amp; Foresty</Button>
                            <Button variant="contained" size="large" color="primary">Animals &amp; Pets</Button>
                            <Button variant="contained" size="large" color="primary">Apparel &amp; Clothing</Button>
                            <Button variant="contained" size="large" color="primary">Arts &amp; Crafts</Button>
                        </div>
                        <div className="profile">
                            <Button variant="contained" size="large" color="primary" >Agriculture &amp; Foresty</Button>
                            <Button variant="contained" size="large" color="primary">Animals &amp; Pets</Button>
                            <Button variant="contained" size="large" color="primary">Add Preferences</Button>
                      </div>
                        </Card.Body>
                    </Card>
                </div>
           
                <p>Past Events</p>   
                <div id="past_EventCards" class="row">
                <EventListCards/> <EventListCards/> <EventListCards/>
                </div>
                </div>
          
            </>
        )
    }
}
export default UserProfile;

