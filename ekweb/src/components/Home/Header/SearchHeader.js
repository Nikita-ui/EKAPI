import React from 'react';
import {Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import './SearchHeader.css';
import SearchIcon from '@material-ui/icons/Search';
const SearchHeader=()=>{
    return(
        <>
        <Navbar id="search_nav" bg="dark" variant="dark">
        <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
           <SearchIcon id="s_icon"/>
        </Form>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home">Ny Dashboard</Nav.Link>
            <label style={{color:"white", fontSize:"14px",marginLeft:"40px",marginTop:"5px"}}>|</label>
            <Nav.Link href="#features">Profile</Nav.Link>
            <label style={{color:"white", fontSize:"14px",marginLeft:"40px",marginTop:"5px"}}>|</label>
            <Nav.Link href="#pricing">MyConnections</Nav.Link>
        </Nav>
        <label style={{color:"white", fontSize:"14px",marginTop:"5px"}}>Hi, Deepak</label>
        </Navbar>
        </>
    )
}
export default SearchHeader;