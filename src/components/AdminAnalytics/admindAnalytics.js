import { Component } from "react";
import {Line, Pie} from 'react-chartjs-2';
import {MDBContainer} from 'mdbreact';
import axios from 'axios';

const API_URL = "https://fdbxb3feqa.execute-api.us-east-2.amazonaws.com/aos-api/";

const dataLine = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Agents Count",
      fill: true,
      lineTension: 0.3,
      backgroundColor: "rgba(225, 204,230, .3)",
      borderColor: "rgb(205, 130, 158)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgb(205, 130,1 58)",
      pointBackgroundColor: "rgb(255, 255, 255)",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(0, 0, 0)",
      pointHoverBorderColor: "rgba(220, 220, 220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [2, 3, 1, 0, 2, 0, 1]
    }
  ]
}

class AdminAnalytics extends Component {
  state = {
    dashboardData: {},
    dataPie: {
      labels: ["Tele", "F2F", "Undefined"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: API_URL + "dashboard-data",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer "+JSON.parse(localStorage.getItem('token'))
      }
    }).then(
      response => {
        this.setState({
          dashboardData: response.data
        })
        console.log(this.state.dashboardData);
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    var data = [this.state.dashboardData.totalTele, this.state.dashboardData.totalF2F, this.state.dashboardData.totalUndefiend];
    var dataPie = {
        labels: ["Tele", "F2F", "Undefined"],
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#949FB1",
              "#4D5360",
              "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#A8B3C5",
              "#616774",
              "#DA92DB"
            ]
          }
        ]
      }

    return(
      <div>
        <div className="row">
          <div className="col-sm-4">
            <div className="card text-white bg-success">
              <div className="card-body">
                <div className="mr-5 font-weight-bold">Total Agents: {this.state.dashboardData.totalCount}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-white bg-danger">
              <div className="card-body">
                <div className="mr-5 font-weight-bold">Total Documents Stored: {this.state.dashboardData.totalDocCount}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <div className="mr-5 font-weight-bold">Insurance Partners: 03</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <MDBContainer>
              <h3 className="mt-3">Agent On-Board</h3>
              <Line data={dataLine} options={{ responsive: true }} />
            </MDBContainer>
          </div>
          <div className="col-sm-6">
            <MDBContainer>
              <h3 className="mt-3">Distribution Channel</h3>
              <Pie data={dataPie} options={{ responsive: true }} />
            </MDBContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminAnalytics;