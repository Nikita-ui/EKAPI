import React,{Component} from 'react';
import './Home.css';
import EventCarousal from '../Events/EventCarousal';
import exhibitor from '../../Assets/exhibitor.png';
import buyer from '../../Assets/buyer.png';
import Organiser from '../../Assets/calender.png';
import Image from 'react-bootstrap/Image';
import Header from './Header/Header';
import Button from '@material-ui/core/Button';
import connect from '../../Assets/connectivity.jpg';
class Home extends Component{
  render(){
    return(
      <>
      <div class="container-fluid">
      <div id="slider_row" class="row">
          <div id="navi">
            <EventCarousal/>
          </div>
          <div id="infoi">
            <Header/>
          </div>
      </div>
      <div id="user_role" class="row">
          <div> <Image src={Organiser} rounded /></div>
          <div> <Image src={buyer} rounded /></div>
          <div> <Image src={exhibitor} rounded /></div>
       </div>
      <div id="user_role1" class="row">
        <div>Organiser</div>
        <div>Buyer</div>
        <div>Exhibitor</div>
      </div>
      <div id="user_role2" class="row">
        <div>Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed tempor incididunt ut labore.</div>
        <div>Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed tempor incididunt ut labore.</div>
        <div>Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed tempor incididunt ut labore.</div>
      </div>
      <div id="it_works" class="row">
      <div id="work_main">
        <p id="how_works">How it works</p>
        <p id="desc_work">Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed tempor incididunt ut labore.</p>
        <Button id="learn_btn" size="large" color="primary">Learn More</Button>
      </div>
      <div>
      <iframe title="how_it_works" width="356" height="220" src="https://www.youtube.com/embed/tlNg4205Tpc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      </div>
      <div id="it_works" class="row">
      <div>
      <Image src={connect} rounded width="294px" height="299px"/>
      </div>
      <div id="work_main">
        <p id="how_works" style={{fontStretch:"semi-condensed"}}>Easy to Connect,<br/>grow your trade</p>
        <p id="desc_work">Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed tempor incididunt ut labore.</p>
        <Button id="learn_btn" size="large" color="primary">Learn More</Button>
      </div>
      </div>
      </div>
   </>
    );
}
}
export default Home;