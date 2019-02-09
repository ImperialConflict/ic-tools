import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  Label,
  Link,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";

import {withCookies, Cookies} from "react-cookie";
import { instanceOf } from 'prop-types';

import ReactGA from 'react-ga';

class FleetForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      post: this.props.data,
      bombers: 0,
      fighters: 0,
      droids: 0,
      soldiers: 0,
      transports: 0,
      planetList: [],
      planets: [],
      readOnly: true,
      fleetResponse: []
    };
    this._fleetReady = this.IsFleetReady.bind(this);
    this._openLink = this.OpenTargetLink.bind(this);
    this._sendFleets = this.sendFleets.bind(this);
  }

  OpenTargetLink(url) {
    window.open(url, "_blank")
  }
  IsFleetReady() {

    if (this.state.transports > 0 && (this.state.soldiers > 0 || this.state.droids > 0)) {
      this.setState({ readOnly: false })
    }
    if (this.state.fighters > 0) {
      this.setState({ readOnly: false })
    }
    if (this.state.bombers > 0) {
      this.setState({ readOnly: false })
    }

  };

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  sendFleets() {

    for (var i = 0; i < this.state.planets.length; i++)
    {
      
      var wind = window.open(this.state.planets[i]["href"]);
      this.wait(500);

      ReactGA.event({
        category: 'Action',
        action: 'Sent Simple Fleet',
    });
     
    };
    }
  

  render() {
    ReactGA.pageview(window.location.hash);
    return (

      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Label for="exampleText" md={5}>
              Fleet
            </Label>
            <Label for="exampleText" md={5}>
              Planets
            </Label>
          </Row>
          <Row form>
            <Col md={5}>

              <ListGroup>
                <ListGroupItem>
                  <Label>Bombers</Label>
                  <Input
                    title="Bombers"
                    type="number"
                    id="bombers"
                    value={this.state.bombers}
                    onChange={(event) => {
                      this.setState({ bombers: event.target.value });
                      { this._fleetReady() };
                    }}
                  />
         

                </ListGroupItem>
                <ListGroupItem>
                  <Label>Fighters</Label>
                  <Input
                    title="Fighters"
                    type="number"
                    id="fighters"
                    value={this.state.fighters}
                    onChange={(event) => {
                      this.setState({ fighters: event.target.value });
                      { this._fleetReady() };
                    }}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <Label>Soldiers</Label>
                  <Input
                    title="Soldiers"
                    type="number"
                    id="soldiers"
                    value={this.state.soldiers}
                    onChange={(event) => {
                      this.setState({ transports: 0 })
                      console.log("set to zero")
                      this.setState({ transports:  Math.ceil((Number(this.state.droids) + Number(event.target.value))/100) })
                      this.setState({ soldiers: event.target.value });
                      this._fleetReady();
                    }}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <Label>Droids</Label>
                  <Input
                    title="Droids"
                    type="number"
                    id="droids"
                    value={this.state.droids}
                    onChange={(event) => {
                      this.setState({ transports: 0 })
                      this.setState({ transports: Math.ceil((Number(this.state.soldiers) + Number(event.target.value))/100) })
                      
                      this.setState({ droids: event.target.value });
                      this._fleetReady();
                    }}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <Label>Transports</Label>
                  <Input
                    title="Transports"
                    type="number"
                    id="transports"
                    value={this.state.transports}
                    onChange={(event) => {
                      console.log("This was hit")
                      this.setState({ transports:0 });
                      this.setState({ transports: event.target.value });
                      { this._fleetReady() };
                    }}
                  />
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Input
                  type="textarea"
                  rows={20}
                  readOnly={this.state.readOnly}
                  title="Planet List"
                  id="planetList"
                  value={this.state.planetList}
                  onChange={(event) => {

                    this.setState({ planets: [] })

                    var planetArray = event.target.value.replace(' ', '').replace(/\r\n/g, '*').replace(/\n/g, '*').split('*');
                    var planetState = []

                    var soldiers = this.state.soldiers;
                    var bombers = this.state.bombers;
                    var droids = this.state.droids;
                    var fighters = this.state.fighters;
                    var transports = this.state.transports;

                    planetArray.forEach(function (entry) {

                      var something = entry.replace(',', ':').split(':');

                      var planet = {
                        key: entry,
                        coords: entry,
                        href: "https://imperialconflict.com/map-backend.php?what=attack&x=" + something[0] + "&y=" + something[1] + "&number=" + something[2] + "&unit1=" + bombers + "&unit2=" + fighters + "&unit3=" + soldiers + "&unit4=" + transports + "&unit5=" + droids
                      }

                      planetState.push(planet)
                    });

                    this.setState({ planets: planetState });
                    this.setState({ planetList: event.target.value });

                  }}
                />
              </FormGroup>
            </Col>
            
          </Row>
          <Button onClick={this._sendFleets}>Send Fleets!</Button>       
        </Form>
      </Container>
    );
  }
}

export default withCookies(FleetForm);
