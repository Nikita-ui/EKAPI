import React,{Component} from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import {Modal,Button,ButtonToolbar} from 'react-bootstrap';
import {SocialIcon} from 'react-social-icons';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from 'axios';


class SignIn extends Component{
  
    state = {
        open:true,
        alertMessage:'',
        Email:"",
        Password:"",
        IsPasswordshow: false,
        data:[]
        };
    handleChange=(e)=>{
      //this.props.onChange({[e.target.name]:e.target.value});
      this.setState({
          [e.target.name]:e.target.value
      });
  };
  
  togglePasswordVisibility = () => {
    const {IsPasswordshow}= this.state;
    this.setState({IsPasswordshow:!IsPasswordshow});
 };

  componentDidMount(){
    axios.get('/Signin').then(response=>{
      const data=response.data;
      if(data.Email===this.state.Email & data.Password=== this.state.Password)
      console.log(data);
        })
    .catch(error=>{
      error.alertMessage='cant be login'
    })
   }
  
         onOpenModal=()=>{
        this.setState({open:true});
      }
      onCloseModal=()=>{
        this.setState({open:false});
     }
     render(){

     const {open,IsPasswordshow} = this.state;
     
    return(
     
      <>
       <Modal id="login_modal" class="_model_radius"  centered size="lg" show={open} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div id="login_frm" class="row">
        <ValidatorForm id="login_form">
          <div class="container input_field">
            <div class="row" style={{marginBottom:"20px"}}>
             <div class="col-md-12">
            <EmailOutlinedIcon id="icon1" fontSize="large" style={{color:"grey",opacity: "0.6"}}/>
               <TextValidator
                id="standard-Email-input"
                label="Email/Mobile"
                type="Email"
                name="Email"
                autoComplete="current-Email"
                margin="normal"
                value={this.state.Email}
                onChange={e=> this.handleChange(e)}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              </div>
              </div>
              <div class="row">
              <div class="col-md-12">
              <LockOutlinedIcon id="icon2" fontSize="large" style={{color:"grey",opacity: "0.6"}}/>
              <TextValidator
               id="login_pswd_input"
                label="Password"
                name="Password"
                type={this.state.IsPasswordshow ? 'text' : 'password'}
                value={this.state.Password}
                onChange={e=> this.handleChange(e)}
                autoComplete="current-password"
                margin="normal"
                validators={['required']}
                errorMessages={['this field is required']}
              />
                  
             </div>
             <i id="login_eye_icon" className={`fa ${IsPasswordshow ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={this.togglePasswordVisibility.bind(this)}/>
            </div>
           
            <div class="row" id="submit_btn">
            <div class="col-md-12">
            <ButtonToolbar>
            <Button variant="primary" type="submit"  className="_centered" size="lg">
              SUBMIT
            </Button>
            </ButtonToolbar>
            </div>
            </div>
                 
            <div class="row" id="or_btn"> <div class="col-md-12"><div className="OR">OR</div></div></div>
              <div class="row" id="socials_btn">
              <div class="col-md-12">
              <div className="social_btn">
              <SocialIcon network="google" />
              <SocialIcon network="twitter" />
              <SocialIcon network="facebook" />
              <SocialIcon network="linkedin" url="http://linkedin.com/in/jaketrent" />
              <SocialIcon network="wechat"/>
            </div>
            </div>
            </div>
           <div class="row" id="newuser">
            <div class="col-md-12 new_user">
              New User? <Link to="signup">Signup</Link>
            </div>
         </div>
      </div>
         </ValidatorForm>
        </div>
        </Modal.Body>
        </Modal>
    </>
  );
}
    
}

export default SignIn;