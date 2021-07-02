import { Component } from "react";
import {Form, Button, Col} from 'react-bootstrap';
import axios from 'axios';

const API_KEY = "PMAK-60c5d7f868933100342ed4b4-b04f2fe6486d40b137e08877cbe118116a";
const API_URL = "https://fdbxb3feqa.execute-api.us-east-2.amazonaws.com/aos-api/";

class FetchAgents extends Component {
  state = {
    fetchedData: [],
    irdaiFetch: [],
    nonVerified: [],
    apiUrl: '',
    message: "",
    load: false
  }

  fetchData = e => {
    e.preventDefault();

    axios({
      method: "GET",
      url: this.state.apiUrl,
      headers: {
        "x-api-key": API_KEY
      }
    }).then(
      response => {
        if(response.data != null){
          this.setState({
            fetchedData: response.data,
          });
        }
        console.log(this.state.fetchedData)
      },
      error => {
        console.log(error)
      }
    );
  }

  getIrdaiData(licenseNum) {
    return axios({
      method: "GET",
      url: "https://b9c4c11e-385d-43fc-9eea-1c7b222d762e.mock.pstmn.io/agent_verify_irdai",
      params: {
        "licenseNum": licenseNum
      },
      headers: {
        "x-api-key": API_KEY
      }
    }).then(
      response => {
        return response.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  verify = e => {
    e.preventDefault();
    var fetchedData = this.state.fetchedData;
    var irdaiArray = this.state.irdaiFetch;
    for(var i=0; i<fetchedData.length; i++) {
      this.getIrdaiData(fetchedData[i].licenseNum)
        .then(data => {
          irdaiArray.push(data)
        });
        console.log(fetchedData[i]);
        console.log(irdaiArray[i]);
        if(irdaiArray[i] != undefined) {
          if(fetchedData[i].aadhar === irdaiArray[i].aadhar && fetchedData[i].pan === irdaiArray[i].pan) {
            fetchedData[i]["status"] = "verified"
            fetchedData[i]["message"] = "Data is Verified"
          } else {
            fetchedData[i]["status"] = "non-verified"
            fetchedData[i]["message"] = "Aadhar or PAN is not Verified"
          }
        }
    }

    if(fetchedData[0].status) {
      this.setState({
        fetchedData: fetchedData
      });
      console.log(this.state.fetchedData);
    }
  }

  onBoard = e => {
    e.preventDefault();
    const d = new Date();

    this.setState({
      message: "",
      load: false
    })

    var fetchedData = this.state.fetchedData;
    var nonVerified = this.state.nonVerified;
    for (var agentD in fetchedData) {
      var data = {
        "joiningDate": d.toISOString(),
        "personalInfo": {
          "name": fetchedData[agentD].name,
          "email": fetchedData[agentD].email,
          "phoneNo": fetchedData[agentD].phoneNo
        },
        "aadhar": {
          "num": fetchedData[agentD].aadhar,
          "link": fetchedData[agentD].aadharLink
        },
        "pan": {
          "num": fetchedData[agentD].pan,
          "panLink": fetchedData[agentD].panLink
        },
        "edu": {
          "tenth": fetchedData[agentD].tenth,
          "twelfth": fetchedData[agentD].twelfth,
          "grad": fetchedData[agentD].grad
        },
        "training": {
          "life": fetchedData[agentD].trainingL,
          "health": fetchedData[agentD].trainingH,
          "general": fetchedData[agentD].trainingG
        },
        "licenseNo": fetchedData[agentD].licenseNum,
        "licenseExp": fetchedData[agentD].licenseExp,
        "insurer": fetchedData[agentD].insurer,
        "status": fetchedData[agentD].status,
        "message": fetchedData[agentD].message
      };

      console.log(data);
      if(data.status === "verified") {
        axios({
          method: "POST",
          url: API_URL + "register-agents",
          data: data,
          headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer "+JSON.parse(localStorage.getItem('token'))
          }
        }).then(
          response => {
            console.log(response);
            this.setState({
              message: "Data uploaded into server.",
              load: true
            })
          },
          error => {
            console.log(error);
            this.setState({
              message: error.message,
              load: false
            })
          }
        );
      } else {
        nonVerified.push({
          "Name": fetchedData[agentD].name,
          "Aadhar": fetchedData[agentD].aadhar,
          "Status": fetchedData[agentD].status,
          "Message": fetchedData[agentD].message
        });
      }
    }
    
    console.log(nonVerified)
    axios({
      method: "POST",
      url: API_URL + "send-notification",
      data: nonVerified,
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
    console.log(this.state.message)
  }

  render() {
    return(
      <div>
        <div className="border border-info p-3">
          <Form onSubmit={this.fetchData}>
            <Form.Row>
              <Col>
                <Form.Control className="mb-2" id="apiInput" placeholder="Enter REST API"
                  value={this.state.apiUrl} 
                  onChange={e => this.setState({apiUrl: e.target.value}) } 
                  required  />
              </Col>
              <Col xs="auto">
                <Button variant="info" className="mb-2" type="submit">Fetch Data</Button>
              </Col>
            </Form.Row>
          </Form>
        </div>
        <table className='table mb-0 mt-3'>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Aadhar No.</th>
              <th scope="col">Pan No.</th>
              <th scope="col">Education</th>
              <th scope="col">Training</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          {this.state.fetchedData.map(({name, email, phoneNo, aadhar, pan, aadharLink, panLink, grad, tenth, twelfth, trainingL, status}) => {
            return (
              <tbody>
                <tr key={aadhar}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phoneNo}</td>
                  {(() => {
                    if(aadharLink) {
                      return (
                        <td><Button variant="outline-info" target="_blank" href={aadharLink} size="sm">{aadhar}</Button></td>
                      )
                    } else {
                      return (
                        <td><Button variant="outline-danger" href={aadharLink} size="sm">{aadhar}</Button></td>
                      )
                    }
                  })()}
                  {(() => {
                    if(panLink) {
                      return (
                        <td><Button variant="outline-info" target="_blank" href={panLink} size="sm">{pan}</Button></td>
                      )
                    } else {
                      return (
                        <td><Button variant="outline-danger" href={panLink} size="sm">{pan}</Button></td>
                      )
                    }
                  })()}
                  {(() => {
                    if(tenth) {
                      if(twelfth) {
                        if(grad) {
                          return (
                            <td><Button variant="outline-info" target="_blank" href={tenth} size="sm">10th</Button>
                                <Button variant="outline-info" target="_blank" href={twelfth} size="sm" className="ml-2 mr-2">12th</Button>
                                <Button variant="outline-info" target="_blank" href={grad} size="sm">Grad</Button></td>
                          )
                        } else {
                          return (
                            <td><Button variant="outline-info" target="_blank" href={tenth} size="sm">10th</Button>
                                <Button variant="outline-info" target="_blank" href={twelfth} size="sm" className="ml-2">12th</Button></td>
                          )
                        }
                      } else {
                        return (
                          <td><Button variant="outline-info" target="_blank" href={tenth} size="sm">10th</Button></td>
                        )
                      }
                    }
                  })()}
                  {(() => {
                    if(trainingL) {
                      return (
                        <td><Button variant="outline-info" target="_blank" href={trainingL} size="sm">Training</Button></td>
                      )
                    } else {
                      return (
                        <td><Button variant="outline-danger" href={trainingL} size="sm">Training</Button></td>
                      )
                    }
                  })()}
                  {(() => {
                    if(status === "verified") {
                      return (
                        <td className="font-weight-bold text-info">{status}</td>
                      )
                    } if(status === "non-verified") {
                      return (
                        <td className="font-weight-bold text-danger">{status}</td>
                      )
                    }
                  })()}
                </tr>
              </tbody>
            )
          })}
        </table>
        <div className="justify-content-end mt-3">
          <Button onClick={this.onBoard} variant="info">On-Board Agents</Button>
          <Button className="ml-2" onClick={this.verify} variant="info">Verify Agents</Button>
        </div>
        <hr />
          {this.state.message && ( 
            <div className="form-group">
              {(() => {
                if(this.state.load === true) {
                  return (<div className="alert alert-success" role="alert">
                    {this.state.message}
                  </div>)
                } else {
                  return (
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  )
                }
              })()}
            </div>
          )}
      </div>
    )
  }
}

export default FetchAgents;