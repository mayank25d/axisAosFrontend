import { Component } from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom';
import AgentOnBoard from "../AgentOnBoard/agentOnBoard";
import FetchAgents from "../AgentOnBoard/fetchAgents";
import AdminAnalytics from "../AdminAnalytics/admindAnalytics";

class Dashboard extends Component{
  render() {
    return(
      <div>
        <Navbar className="justify-content-between" bg="info" variant="dark">
          <Navbar.Brand className="ml-2" href="/dashboard">Agent On-Boarding</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="/dashboard/fetch-agents">Fetch Agents</Nav.Link>
            <Nav.Link href="/dashboard/onBoardAgents">On-Board Agents</Nav.Link>
            <Nav.Link href="/dashboard">Logout</Nav.Link>
          </Nav>
        </Navbar>
        <div className="align-items-center justify-content-center mt-3">
            <Switch>
              <Route path="/dashboard/fetch-agents">
                <Container>
                  <FetchAgents />
                </Container>
              </Route>
              <Route path="/dashboard/onBoardAgents">
                <AgentOnBoard />
              </Route>
              <Route path="/dashboard">
                <Container>
                  <AdminAnalytics />
                </Container>
              </Route>
            </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;