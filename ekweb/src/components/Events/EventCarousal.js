import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './EventCarousal.css';

import ex2 from '../../Assets/ex2.jpg';
import ex3 from '../../Assets/ex3.jpg';
import Button from '@material-ui/core/Button';
const EventCarousal=()=>{
    return(
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Enroll Hassel free with Exhibition
       get instant quotes…</h3>
      <p>In Delhi</p>
      <Button size="large" color="primary">Learn More</Button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Enroll Hassel free with Exhibition
get instant quotes…</h3>
      <p>In HongKong</p>
      <Button size="large" color="primary">Learn More</Button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={ex3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Enroll Hassel free with Exhibition
get instant quotes…</h3>
      <p>In Japan</p>
      <Button size="large" color="primary">Learn More</Button>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}



export default EventCarousal;
    
    
      
