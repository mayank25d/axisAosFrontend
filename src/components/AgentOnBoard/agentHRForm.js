import axios from "axios";
import { Component } from "react";
import {Form, Col, Row, Button} from 'react-bootstrap';

const API_KEY = "";

class AgentHRForm extends Component {
  state = {
    hrData: {},
    irdaiData: {},
    userID: "",
    licenseNo: ""
  }

  componentDidMount() {
    
  }

  verifyAndReg = e => {
    e.preventDefault();

    console.log();

    const d = new Date();
    var data = {
      "userID": this.state.hrData.userID,
      "joiningDate": d.toISOString(),
      "distriChannel": this.state.hrData.channel,
      "login": this.state.hrData.login
    };

    console.log(data);

    axios({
      method: "PUT",
      url: "https://fdbxb3feqa.execute-api.us-east-2.amazonaws.com/aos-api/update-agents",
      data: data,
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    return(
      <Form onSubmit={this.verifyAndReg}>
        <Form.Row>
          <Form.Group as={Col} controlId="licenseNum">
            <Form.Label>License Number</Form.Label>
            <Form.Control type="text" placeholder={this.props.data.licenseNo} readOnly 
              onChange={e => this.setState({licenseNo: this.props.data.licenseNo})}/>
          </Form.Group>
          <Form.Group as={Col} controlId="licenseExp">
            <Form.Label>License Expiry</Form.Label>
            <Form.Control type="text" placeholder={this.props.data.licenseExp} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="insurer">
            <Form.Label>Insurer</Form.Label>
            <Form.Control type="text" placeholder={this.props.data.insurer} readOnly />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="aadhar">
            <Form.Label>Aadhar</Form.Label>
            <Form.Control type="text" placeholder={this.props.data.aadhar.num} readOnly />
          </Form.Group>
          <Form.Group as={Col} controlId="pan">
            <Form.Label>PAN</Form.Label>
            <Form.Control type="text" placeholder={this.props.data.pan.num} readOnly />
          </Form.Group>                 
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Education</Form.Label>
            <Row>
              <Col sm="3">
                {(() => {
                  if(this.props.data.edu.tenth) {
                    return(
                      <Form.Check type="checkbox" label="10th" checked readOnly/>
                    )
                  } else {
                    return(
                      <Form.Check type="checkbox" label="10th" readOnly/>
                    )
                  }
                })()}
              </Col>
              <Col sm="3">
              {(() => {
                  if(this.props.data.edu.twelfth) {
                    return(
                      <Form.Check type="checkbox" label="12th" checked readOnly />
                    )
                  } else {
                    return(
                      <Form.Check type="checkbox" label="12th" readOnly/>
                    )
                  }
                })()}                
              </Col>
              <Col sm="3">
              {(() => {
                  if(this.props.data.edu.grad) {
                    return(
                      <Form.Check type="checkbox" label="Grad" checked readOnly />
                    )
                  } else {
                    return(
                      <Form.Check type="checkbox" label="Grad" readOnly/>
                    )
                  }
                })()}   
              </Col>
            </Row>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Training</Form.Label>
            {(() => {
              if(this.props.data.training.health || this.props.data.training.life || this.props.data.training.general) {
                return(
                  <Form.Check type="checkbox" label="Basic Insurance Training" checked readOnly />
                )
              } else {
                return(
                  <Form.Check type="checkbox" label="Basic Insurance Training" readOnly/>
                )
              }
            })()}  
          </Form.Group>                                       
        </Form.Row> 
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Distribution Channel</Form.Label>
            <Row>
              <Col sm="3">
              {(() => {
                  if(this.props.data.distriChannel === "tele") {
                    return(
                      <Form.Check type="checkbox" label="Tele-Marketing" checked readOnly />
                    )
                  } else {
                    return(
                      <Form.Check type="checkbox" label="Tele-Marketing" />
                    )
                  }
                })()}                   
              </Col>
              <Col sm="3">
              {(() => {
                  if(this.props.data.distriChannel === "f2f") {
                    return(
                      <Form.Check type="checkbox" label="Face-To-Face" checked readOnly />
                    )
                  } else {
                    return(
                      <Form.Check type="checkbox" label="Face-To-Face" />
                    )
                  }
                })()}   
              </Col>
            </Row>            
          </Form.Group>
        </Form.Row> 
        <Form.Row>
          <Form.Label>Tele-Calling Login</Form.Label>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
        </Form.Row>   
        <Form.Row>
          <Form.Label>CRM Login</Form.Label>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control type="text" placeholder="Password" />
          </Form.Group>
        </Form.Row>               

        <Button variant="info" type="submit">Verify and Register</Button>
      </Form>
    );
  }
}

export default AgentHRForm;