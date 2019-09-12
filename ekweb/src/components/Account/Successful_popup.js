import React,{Component} from 'react';
import './SignIn.css';
import {Modal} from 'react-bootstrap';
import success from '../../Assets/success_img.png'; 
import qrimg from '../../Assets/qrcode.jpg'; 
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import './Successful.css';
class Successful extends Component{
  
    state = {
        open:true
    }
      onOpenModal=()=>{
        this.setState({open:true});
      }
      onCloseModal=()=>{
        this.setState({open:false});
     }
     render(){
    
     const {open} = this.state;
     
    return(
     
      <>
       <Modal id="login_modal" class="_model_radius"  centered size="lg" show={open} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:"500"}}>Your Account has been successfully created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             
          <div class="container input_field">
            <div class="row">
                <div class="col-md-12">
                <img alt="Account_Created" src={success} width="100px" height="100px"/>
                </div>
            </div>
              <div class="row">
                <div class="col-md-12">
                <img alt="Qr_Code" src={qrimg} width="150px" height="150px"/>
                </div>

              </div>
              <div class="row" style={{margin:"20px 0px 20px 0px"}}>
                <div class="col-md-12" style={{fontWeight:"500"}}>
                Save Your QR code for future reference
                </div>
            </div>
            <div class="row"  id="newuser">
            <span id="qr_span" class="col-md-12 new_user">
            <GetAppIcon id="dl_icon"/> Download QR Code
            </span>
            <span id="sh_span" class="col-md-12 new_user">
            <ShareIcon id="sh_icon"/> Share
            </span>
         </div>
      </div>
   
        </Modal.Body>
        </Modal>
    </>
  );
}
    
}

export default Successful;