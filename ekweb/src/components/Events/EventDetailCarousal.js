import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './EventCarousal.css';
import ex2 from '../../Assets/ex2.jpg';
import ex3 from '../../Assets/ex3.jpg';
import Button from '@material-ui/core/Button';
const EventDetailCarousal=()=>{
    return(
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Event1</h3>
      <p>In Delhi</p>
      <Button variant="contained" className="pull-right" style={{backgroundColor:"#ff7108", marginTop:"200px",borderRadius:"27px",width:"243px", Height:"50px",fontSize: "20px !important",fontWeight:"600"}} size="large" color="secondary">INTRESTED</Button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Event2</h3>
      <p>In HongKong</p>
      <Button variant="contained" className="pull-right" style={{backgroundColor:"#ff7108",borderRadius:"27px",width:"243px", marginTop:"200px", Height:"50px",fontSize: "20px !important",fontWeight:"600"}} size="large" color="secondary">INTRESTED</Button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Event3</h3>
      <p>In Japan</p>
      <Button variant="contained" className="pull-right" style={{backgroundColor:"#ff7108",borderRadius:"27px", marginTop:"200px",width:"243px", Height:"50px",fontSize: "20px !important",fontWeight:"600"}} size="large" color="secondary">INTRESTED</Button>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}



export default EventDetailCarousal;
    
    
      
