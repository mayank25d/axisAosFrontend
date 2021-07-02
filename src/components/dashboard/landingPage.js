import { Component } from "react";
import { Container, Nav, Navbar} from 'react-bootstrap';
import { Route, Switch } from "react-router";
import Login from "../authentication/login";
import SignUp from "../authentication/signup";

class LandingPage extends Component {
  render() {
    return(
      <div>
        <Navbar bg="info" variant="dark">
          <Navbar.Brand className="ml-2" href="/">AOS</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/signUp">Sign-Up</Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          <div className="d-lg-flex align-items-center justify-content-center" style={{height:350}}>
            <div className="border border-info p-3">
              <Switch>
                <Route path="/signUp">
                  <SignUp />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default LandingPage;