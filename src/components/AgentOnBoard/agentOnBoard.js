import { Component } from "react";
import { Card, Accordion, Container } from "react-bootstrap";
import AgentHRForm from "./agentHRForm";
import {Form ,Col, Button, Row} from "react-bootstrap";
import DocumentViewer from "./documentViewer";
import axios from 'axios';

const API_URL = "https://fdbxb3feqa.execute-api.us-east-2.amazonaws.com/aos-api/get-agents/";
const API_KEY = "PMAK-60c5d7f868933100342ed4b4-b04f2fe6486d40b137e08877cbe118116a";

class AgentOnBoard extends Component {
  state = {
    data : [],
    hrData: '',
    irdaiData: ''
  }

  getAgent = e => {
    e.preventDefault();

    axios({
      method: "GET",
      url: API_URL + "by-userid",
      params: {
        "userID": "JDIAWWI4I"
      },
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(
      response => {
        this.setState({
          data: response.data
        })
        console.log(this.state.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  verifyAndReg = e => {
    e.preventDefault();

    axios({
      method: "GET",
      url: "https://b9c4c11e-385d-43fc-9eea-1c7b222d762e.mock.pstmn.io/agent_data_HR",
      headers: {
        "x-api-key": API_KEY
      }
    }).then(
      response => {
        if(response.data != null){
          this.setState({
            hrData: response.data
          });
        }
        console.log(this.state.hrData);
      },
      error => {
        console.log(error)
      }
    );

    axios({
      method: "GET",
      url: "https://b9c4c11e-385d-43fc-9eea-1c7b222d762e.mock.pstmn.io/agent_verify_irdai",
      headers: {
        "x-api-key": API_KEY
      }
    }).then(
      response => {
        if(response.data != null){
          this.setState({
            irdaiData: response.data
          });
        }
        console.log(this.state.irdaiData);
      },
      error => {
        console.log(error)
      }
    );
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: API_URL + "by-dis-channel",
      params: {
        "channel": "undefined"
      },
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(
      response => {
        this.setState({
          data: response.data
        })
        console.log(this.state.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <Container fluid>
        <Form className="mt-5" onSubmit={this.getAgent}>
          <Form.Row className="align-items-center justify-content-center">
            <Col className="col-sm-3">
              <Form.Control className="mb-2" id="apiInput" placeholder="Enter Agent's User-ID" />
            </Col>
            <Col xs="auto">
              <Button variant="info" className="mb-2" type="submit">Search</Button>
            </Col>
          </Form.Row>
        </Form>
        <Accordion>
          <Card>
          {this.state.data.map(({userID, joiningDate, personalInfo, aadhar, pan, edu, 
          training, licenseNo, licenseExp, insurer, distriChannel, login}) => {
            
            return (
              <div>
                <Accordion.Toggle as={Card.Header} eventKey={userID}>
                  <div className="row pl-3">
                    <label>Name: </label>
                    <div className="col-sm-3">                      
                      <input className="form-control" type="text" placeholder={personalInfo.name} readOnly></input>                
                    </div>
                    <label>User-ID: </label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" placeholder={userID} readOnly></input>
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={userID}>
                  <Card.Body>
                    <div className="row">
                      <div className="col">
                        <Form onSubmit={this.verifyAndReg}>
                          <Form.Row>
                            <Form.Group as={Col} controlId="licenseNum">
                              <Form.Label>License Number</Form.Label>
                              <Form.Control type="text" placeholder={licenseNo} readOnly />
                            </Form.Group>
                            <Form.Group as={Col} controlId="licenseExp">
                              <Form.Label>License Expiry</Form.Label>
                              <Form.Control type="text" placeholder={licenseExp} readOnly />
                            </Form.Group>
                            <Form.Group as={Col} controlId="insurer">
                              <Form.Label>Insurer</Form.Label>
                              <Form.Control type="text" placeholder={insurer} readOnly />
                            </Form.Group>
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col} controlId="aadhar">
                              <Form.Label>Aadhar</Form.Label>
                              <Form.Control type="text" placeholder={aadhar.num} readOnly />
                            </Form.Group>
                            <Form.Group as={Col} controlId="pan">
                              <Form.Label>PAN</Form.Label>
                              <Form.Control type="text" placeholder={pan.num} readOnly />
                            </Form.Group>                 
                          </Form.Row>
                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label>Education</Form.Label>
                              <Row>
                                <Col sm="3">
                                  {(() => {
                                    if(edu.tenth) {
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
                                    if(edu.twelfth) {
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
                                    if(edu.grad) {
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
                                if(training.health || training.life || training.general) {
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
                                    if(distriChannel === "tele") {
                                      return(
                                        <Form.Check type="checkbox" label="Tele-Marketing" checked readOnly />
                                      )
                                    } if(this.state.hrData.userID === userID) {
                                        if(this.state.hrData.channel === "tele") {
                                          return(
                                            <Form.Check type="checkbox" label="Tele-Marketing" checked readOnly />
                                          )
                                        }                              
                                    } else {
                                      return(
                                        <Form.Check type="checkbox" label="Tele-Marketing" />
                                      )
                                    }
                                  })()}                   
                                </Col>
                                <Col sm="3">
                                {(() => {
                                    if(distriChannel === "f2f") {
                                      return(
                                        <Form.Check type="checkbox" label="Face-To-Face" checked readOnly />
                                      )
                                    } if(this.state.hrData.userID === userID) {
                                        if(this.state.hrData.channel === "f2f") {
                                          return (
                                            <Form.Check type="checkbox" label="Face-To-Face" checked readOnly />
                                          )
                                        }
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
                          {(() => {
                            if(this.state.hrData.userID === userID){
                              if(this.state.hrData.login) {
                              return(
                                <Form.Row>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder={this.state.hrData.login.tele.username} readOnly />
                                  </Form.Group>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder={this.state.hrData.login.tele.pass} readOnly />
                                  </Form.Group>
                                </Form.Row>
                              )
                            }} else {
                              return(
                                <Form.Row>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Username" />
                                  </Form.Group>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Password" />
                                  </Form.Group>
                                </Form.Row>
                              )
                            }
                          })()}   
                          <Form.Row>
                            <Form.Label>CRM Login</Form.Label>
                          </Form.Row>
                          {(() => {
                            if(this.state.hrData.userID === userID) {
                              if(this.state.hrData.login) {
                              return(
                                <Form.Row>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder={this.state.hrData.login.crm.username} readOnly />
                                  </Form.Group>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder={this.state.hrData.login.crm.pass} readOnly />
                                  </Form.Group>
                                </Form.Row>
                              )
                            }} else {
                              return(
                                <Form.Row>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Username" />
                                  </Form.Group>
                                  <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Password" />
                                  </Form.Group>
                                </Form.Row>
                              )
                            }
                          })()}            

                          <Button variant="info" type="submit">Verify and Register</Button>
                        </Form>
                      </div>
                      <div className="col">
                        <DocumentViewer />
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            )
          })}
          </Card>
        </Accordion>
      </Container>
    );
  }
}

export default AgentOnBoard;