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

class FleetForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      post: this.props.data,
      bombersInitial: 0,
      bombersDescending: 0,
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
      console.log(wind);
      this.wait(2000);
      wind.close();
     
    };
    }
  

  render() {
    return (

    
                <Input
                  type="textarea"
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
            
    );
  }
}

export default withCookies(FleetForm);
