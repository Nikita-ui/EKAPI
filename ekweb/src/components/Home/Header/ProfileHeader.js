import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './ProfileHeader.css';
import Image from 'react-bootstrap/Image';
import profilepic from '../../../Assets/modi.jpg';

const ProfileHeader=()=>{
    return(
      <>
      <Navbar id="Profile_nav" bg="dark"  variant="dark" className="pull-right">
        <Nav className="mr-auto" >
        <Nav.Link href="#home">Ny Dashboard</Nav.Link>
        <label style={{color:"white", fontSize:"14px",marginLeft:"10px",marginTop:"5px"}}>|</label>
        <Nav.Link href="#features">Profile</Nav.Link>
        <label style={{color:"white", fontSize:"14px",marginLeft:"10px",marginTop:"5px"}}>|</label>
        <Nav.Link href="#pricing">MyConnections</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label style={{color:"white", fontSize:"12px",marginTop:"10px"}}>Hi, Deepak</label>
        </Nav>
      </Navbar>
      <Image id="round_img" src={profilepic} alt="profile_pic" width="171" height="180" roundedCircle  />
      <div id="profile_name">
      <span style={{fontSize:"30px"}}>Narender modi</span><br/>
      <span style={{fontSize:"18px"}}>india pvt ltd.</span>
      </div>
    </>
    )
}
export default ProfileHeader;