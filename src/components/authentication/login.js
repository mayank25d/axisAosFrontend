import { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {CognitoUser, AuthenticationDetails, CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-east-2_rZxnPqCDa",
  ClientId: "5fe8967bqjjl8qrpr0avlag162"
}
const UserPool = new CognitoUserPool(poolData);

class Login extends Component {
  state = {
    userID:  '',
    pass: '',
    message: '',
    loading: false
  }

  handleLogin = e => {
    e.preventDefault();

    this.setState({
      message:'',
      loading: true
    });

    console.log(this.state.userID, this.state.pass);

    const user = new CognitoUser ({
      Username: this.state.userID,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails({
      Username: this.state.userID,
      Password: this.state.pass
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('onSuccess: ', data);
        localStorage.setItem("token", JSON.stringify(data.getIdToken().getJwtToken()));
        localStorage.setItem("userdata", JSON.stringify(data.getIdToken().decodePayload()));
        this.props.history.push("/dashboard");
        window.location.reload();
      },
      onFailure: err => {
        console.error('onFailure: ', err);
        this.setState({
          loading: false,
          message: err.message
        });
      },
      newPasswordRequired: function (userAttributes, requiredAttributes){
        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // unsure about this field, but I don't send this back
        delete userAttributes.phone_number_verified;

        user.completeNewPasswordChallenge("Dhiman@1234", userAttributes, this);
      }
    });
  }

  render() {
    return(
      <div>
        <Form onSubmit={this.handleLogin}>
          <Form.Group controlId="formBasicID">
            <Form.Label>User-ID</Form.Label>
            <Form.Control type="text" placeholder="Enter User-ID" value={this.state.userID} 
              onChange={e => this.setState({userID: e.target.value}) } required />
          </Form.Group>
      
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.pass} 
              onChange={e => this.setState({pass: e.target.value}) } required />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Login
          </Button>
          <hr />
          {this.state.message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            </div>
          )}
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);