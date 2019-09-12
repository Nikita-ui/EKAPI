import React,{Component} from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import AndroidIcon from '@material-ui/icons/Android';
import Button from '@material-ui/core/Button';
class Header extends Component{
 render(){
  return(
    <>
  
  <nav className="animenu" role="navigation" aria-label="Menu">

  <button className="animenu__toggle">
    <span className="animenu__toggle__bar"></span>
    <span className="animenu__toggle__bar"></span>
    <span className="animenu__toggle__bar"></span>
  </button>
 
  <ul className="animenu__nav">
  <li style={{marginRight:"60px"}}><Link to="/">EXIKONNECT</Link></li>
    <li><Link to="/">HOME</Link></li>
    <li><Link to="/Aboutus">ABOUT US</Link></li>
    <li>
      <Link to="#" className="animenu__nav__hasDropdown" aria-haspopup="true">DEMO</Link>
      <ul className="animenu__nav__dropdown" aria-label="submenu">
        <li><Link to="EventList" role="menuitem">EventList</Link></li>
        <li><Link to="UserProfile" role="menuitem">UserProfile</Link></li>
      </ul>
    </li>
   
    <li><Link to="Contactus">CONTACT US</Link></li>
    <li id="android_icon"><Link to="/Aboutus"><AndroidIcon/></Link></li>
    <li id="apple_icon"><Link to="/Aboutus"><AndroidIcon/></Link></li>
    <Button id="login_btn" size="large" color="primary">LOGIN</Button>
  </ul>
 
</nav>
</>
  );
}
}

 export default Header;