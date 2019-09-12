import React,{Component} from 'react';
import './Signup.css';
import {Modal,Button,ButtonToolbar} from 'react-bootstrap';
import axios from 'axios';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import SuccessAlert from './SuccessAlert';
import SuccessfulScreen from './Successful_popup';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Signup extends Component{

    state = {
        Name:'',
        Password:'',
        Email:'',
        Phone:'',
        CompanyName:'',
        PhoneCode:'',
        Designation:'',
        passwordIsMasked: true,
        open:true,
        alertMessage:'',
        IsPasswordshow:false,
        showPasswordStrength:true
       };

      togglestrengthPassword=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        const showPass=this.state.showPasswordStrength;
        this.setState({
          showPass: !showPass
        })
      }

        togglePasswordVisibility = () => {
         const {IsPasswordshow}= this.state;
         this.setState({IsPasswordshow:!IsPasswordshow});
      };

    onOpenModal=()=>{
        this.setState({open:true})
    }
      onCloseModal=()=>{
        this.setState({open:false})
     }
     handleOnChange=(value)=> {
      this.setState({ PhoneCode: value })
    }
  
    handleChange=(e)=> {
      this.setState({[e.target.name]:e.target.value})
    }
 
    handleSubmit=(event)=>{
     
      event.preventDefault();
      console.log(this.state)
        axios.post('/Signup',this.state).then(response=>{
       const profile=response.data;
       console.log(profile);
       return <SuccessfulScreen/>
      })
        .catch(error=>{
        
           error.alertMessage='cant be submitted'
       
        })
      }

      
      render(){
      
     const {open, IsPasswordshow} = this.state;
     const {Name,Email, PhoneCode,Phone, Designation, CompanyName, Password }= this.state;
     return(
      <>
   
     <Modal style={{position:"absolute"}} id="signup_modal" class="_model_radius"  centered size="lg" show={open} onHide={this.onCloseModal}>
     <div style={{marginRight:"20px", marginLeft:"20px"}}>{this.state.alert_message==="success"?<SuccessAlert/>:null}</div>
        <Modal.Header closeButton>
    
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="signup_frm" class="row">
        <ValidatorForm id="signup_form" onSubmit={this.handleSubmit.bind(this)}>
          <div class="container">
            <div class="row">
             <div class="col-md-6">
          
             <TextValidator
                id="standard-Name-input"
                label="Name"
                type="text"
                name="Name"
                value={Name}
                autoComplete="current-Name"
                margin="normal"
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
             
              </div>
              <div class="col-md-6 ">
           
              <TextValidator
                id="standard-Email-input"
                label="Email"
                type="Email"
                name="Email"
                value={Email}
                autoComplete="current-Email"
                margin="normal"
                onChange={this.handleChange}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              </div>
              </div>
           
            <div class="row">
            <div class="col-md-6">
     
            <div  style={{display:"flex", justifyContent:"center"}}>
              <ReactPhoneInput defaultCountry={'in'} value={PhoneCode} onChange={this.handleOnChange}/>
               <TextValidator 
                id="standard-Phone-input"
                label="Mobile Number"
                type="number"
                name="Phone"
                value={Phone}
                autoComplete="current-Phone"
                margin="normal"
                onChange={this.handleChange}
                validators={['required', 'matchRegexp:^[0-9]$']}
                errorMessages={['this field is required', 'Pls enter only digits']}
              />
              </div>
             </div>
             <div class="col-md-6">
        
              <TextValidator
                id="standard-CompanyName-input"
                label="Company Name"
                type="text"
                name="CompanyName"
                value={CompanyName}
                autoComplete="current-CompanyName"
                margin="normal"
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
            
              <TextValidator
                id="standard-Designation-input"
                label="Designation"
                type="text"
                name="Designation"
                value={Designation}
                autoComplete="current-Designation"
                margin="normal"
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              </div>
              <div class="col-md-6 ml-auto">
          
              <TextValidator
                id="standard-Password-input" 
                label="Password"
                type={this.state.IsPasswordshow ? 'text' : 'password'}
                name="Password"
                value={Password}
                autoComplete="current-password"
                margin="normal"
                onFocus={this.state.showPasswordStrength ? <PasswordStrengthMeter password={this.state.Password}/>  : null}
                onChange={this.togglestrengthPassword.bind(this)}
                validators={['required']}
                errorMessages={['this field is required']}
               />
               <i className={`fa ${IsPasswordshow ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={this.togglePasswordVisibility.bind(this)}/>
            
              </div>
              </div>
                    
            <div class="row">
            <div class="col-3 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
            <ButtonToolbar id="btn_submit">
            <Button variant="primary" type="submit" className="_centered" size="lg">
              SUBMIT
            </Button>
            </ButtonToolbar>
           
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

export default Signup;