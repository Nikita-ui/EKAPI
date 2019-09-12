import React,{Component} from 'react';
import aboutus_img from '../../Assets/aboutus2.jpg'; 
import './Aboutus.css';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import modi from '../../Assets/modi.jpg'; 
import {SocialIcon} from 'react-social-icons';

class Aboutus extends Component{
    state={
        opened:false
   }
    
    toggleBox=()=> {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
    }
    render(){
        
    return(
       <>
        <div class="row">
         <img alt="Aboutus" src={aboutus_img} width="100%" height="350px"/>
        </div>
        <div class="container">
            <div class="row">
                <div className="abt_title">About Us</div>
            </div>
            <div class="row">
                <div className="abt_txt">ExiConnect is an end-to-end for any type of partner Exhibition management tool that allows organizers, corporations, and non-profit agencies to plan, promote, and run events ranging from large-scale meetings to conferences and trade shows. It comes equipped with a broad range of features, including a multi-language website builder, planner, attendee mobile app, sponsor management, detailed analytics and more. Plan, promote, and execute one or hundreds of Exhibition, large and small, efficiently from start to finish. It drive revenue, save time and increase ROI with a full suite of high-performance tools that streamline operations and maximize engagement. Keep data synchronized in a central location and leverage it to establish lasting relationships. </div>
            </div>
            <div class="row" style={{justifyContent:"flex-end"}}>
            <button id="btn_readmore" type="button" onClick={this.toggleBox.bind(this)}  className="read_more">Read More  <b>&gt;</b></button>   {!this.state.opened && <alert />}
            </div>
            <div class="row" style={{justifyContent:"center",marginTop:"100px",marginBottom:"100px"}}>
            <Paper square>
                <Tabs
                   onChange={this.handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab id="first_tab" label="Team" />
                    <Tab label="Mission" />
                    <Tab label="Vision" />
                </Tabs>
              
            </Paper>
            
            </div>
            <div class="row" style={{flexDirection:"row"}}>
                <div class="col-md-3"><img style={{borderRadius:"20px"}} src={modi} alt="Team member" width="200px" height="260px"></img></div>
                <div class="col-md-9" style={{margin: "15px -25px 15px -25px"}}>
                    <div class="img_righttxt">Narender Modi</div>
                    <div className="abt_txt">ExiConnect is an end-to-end for any type of partner Exhibition management tool that allows organizers, corporations, and non-profit agencies to plan, promote, and run events ranging from large-scale meetings to conferences and trade shows. It comes equipped with a broad range of features, including a multi-language website builder, planner, attendee mobile app, sponsor management, detailed analytics and more. </div>
                    <div id="icon_id"><span style={{marginRight:"20px"}}>Follow on</span>
                        <SocialIcon  network="linkedin" url="http://linkedin.com/in/jaketrent" />
                        <SocialIcon  network="facebook" />
                        <SocialIcon  network="twitter" />
                   </div>
                </div>
            </div>
            <div class="row" style={{flexDirection:"row"}}>
                <div class="col-md-3"><img style={{borderRadius:"20px"}} src={modi} alt="Team member" width="200px" height="260px"></img></div>
                <div class="col-md-9" style={{margin: "15px -25px 15px -25px"}}>
                    <div class="img_righttxt">Narender Modi</div>
                    <div className="abt_txt">ExiConnect is an end-to-end for any type of partner Exhibition management tool that allows organizers, corporations, and non-profit agencies to plan, promote, and run events ranging from large-scale meetings to conferences and trade shows. It comes equipped with a broad range of features, including a multi-language website builder, planner, attendee mobile app, sponsor management, detailed analytics and more. </div>
                    <div id="icon_id"><span style={{marginRight:"20px"}}>Follow on</span>
                        <SocialIcon  network="linkedin" url="http://linkedin.com/in/jaketrent" />
                        <SocialIcon  network="facebook" />
                        <SocialIcon  network="twitter" />
                   </div>
                </div>
            </div>
            <div class="row" style={{flexDirection:"row"}}>
                <div class="col-md-3"><img style={{borderRadius:"20px"}} src={modi} alt="Team member" width="200px" height="260px"></img></div>
                <div class="col-md-9" style={{margin: "15px -25px 15px -25px"}}>
                    <div class="img_righttxt">Narender Modi</div>
                    <div className="abt_txt">ExiConnect is an end-to-end for any type of partner Exhibition management tool that allows organizers, corporations, and non-profit agencies to plan, promote, and run events ranging from large-scale meetings to conferences and trade shows. It comes equipped with a broad range of features, including a multi-language website builder, planner, attendee mobile app, sponsor management, detailed analytics and more. </div>
                    <div id="icon_id"><span style={{marginRight:"20px"}}>Follow on</span>
                        <SocialIcon  network="linkedin" url="http://linkedin.com/in/jaketrent" />
                        <SocialIcon  network="facebook" />
                        <SocialIcon  network="twitter" />
                   </div>
                </div>
            </div>
            </div>
 </>
       );
    }
}
   



export default Aboutus;
