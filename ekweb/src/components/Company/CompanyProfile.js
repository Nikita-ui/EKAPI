import React,{Component} from 'react';
import './CompanyProfile.css';
import ProfileHeader from  '../Home/Header/ProfileHeader';
import Card from 'react-bootstrap/Card';
import DirectionsIcon from '@material-ui/icons/Directions'; 

class CompanyProfile extends Component {
    render(){
          return (
      <>
      <div>
          <ProfileHeader/>
          <Card>
                 <Card.Body>
                    <Card.Text>
                      <div>Overview</div>                 
                        <p>Jayanita is part of the Constellation group with 5 manufacturing facilities in India and a distribution in the US.</p>
                        <p>The vision is to be a "Complete Window Solution" company proving the world with all aspects of decorating a window - both textile & hardware. </p>
                        <p>The company also manufactures Metal garden decorative products like Citronella Torches & DIY shelving hardware.</p>
                        <p>The company owns the brand "Deco Windows" and market the products with India under this brand.</p>
                        <div>Company Size</div>
                        <p>201-500 employees</p>
                        <div>Specialities</div>
                        <p>Drapery Hardware Drapery Panels Trimmungs Tiebacks & Tassels Home Furnishing Madeups Garden
                            & Outdoor Metal Decorative DIY hardware</p>
                        <div>Locations</div>
                        <p>Corporate Office<br/>
                            297 FIE Patparganj Indl. Area, Delhi, 110092, IN</p>
                            <div id="get_direction">Get direction<DirectionsIcon/></div>   
                      </Card.Text>
                  </Card.Body>
            </Card>
      </div>
   </>
  );
}
}

export default CompanyProfile;