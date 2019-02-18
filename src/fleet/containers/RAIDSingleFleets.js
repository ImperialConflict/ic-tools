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

import ReactGA from 'react-ga';


class RAIDSingle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      post: this.props.data,
      bombers: 0,
      fighters: 0,
      droids: 0,
      soldiers: 0,
      transports: 0,
      modifierDirection: "Decrease",
      iterations: 1,
      bombersModifier: 0,
      fightersModifier: 0,
      droidsModifier: 0,
      soldiersModifier: 0,
      transportsModifier: 0,
      planetList: [],
      planets: [],
      readOnly: true,
      fleetResponse: []
    };
    this._fleetReady = this.IsFleetReady.bind(this);
    this._openLink = this.OpenTargetLink.bind(this);
    this._sendFleets = this.sendFleets.bind(this);
    this._sendRaids = this.sendRaids.bind(this);
    this._updatePlanets = this.updatePlanets.bind(this);
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

  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  sendFleets() {



    for (var i = 0; i < this.state.planets.length; i++) {
      ReactGA.event({
        category: 'Action',
        action: 'Sent raid Fleet',
      });

      var wind = window.open(this.state.planets[i]["href"]);
      var cookies = wind.document.cookie
      console.log(cookies)

      this.wait(1000);
      wind.close();

    };
  }
  updatePlanets(event) {
    this.setState({ planets: [] })
    
    var planetArray = event.target.value.replace(' ', '').replace(/\r\n/g, '*').replace(/\n/g, '*').split('*');
    var planetState = []
    
    var soldiers = Number(this.state.soldiers);
    var bombers = Number(this.state.bombers);
    var droids = Number(this.state.droids);
    var fighters = Number(this.state.fighters);
    var soldiersModifier = Number(this.state.soldiersModifier);
    var bombersModifier = Number(this.state.bombersModifier);
    var droidsModifier = Number(this.state.droidsModifier);
    var fightersModifier = Number(this.state.fightersModifier);
    var multiplicator = 0;

    // convert the word to the value for multiplication  
    if (this.state.modifierDirection === "Decrease") {
      multiplicator = -1;
    }
    else {
      multiplicator = +1;
    }

    // eslint-disable-next-line no-loop-func
    for (var i = 0; i < planetArray.length; i++) {

      var compoundMultiplicator = i * multiplicator;
      var modBombers = bombers + (bombersModifier * compoundMultiplicator);
      // Compound depreciation, using the iterator as the interval
      var modFighters = fighters * Math.pow((1 + (fightersModifier / 100 * multiplicator)), i)
      var modSoldiers = soldiers * Math.pow((1 + (soldiersModifier / 100 * multiplicator)), i)
      var modDroids = droids * Math.pow((1 + (droidsModifier / 100 * multiplicator)), i)
      var modTransports = Math.ceil((modDroids + modSoldiers) / 100);

      var planetcoords = planetArray[i].replace(',', ':').split(':');

      var planet = {
        key: planetArray[i],
        coords: planetArray[i],
        href: "https://imperialconflict.com/map-backend.php?what=attack&x=" + planetcoords[0] + "&y=" + planetcoords[1] + "&number=" + planetcoords[2] + "&unit1=" + modBombers + "&unit2=" + modFighters + "&unit3=" + modSoldiers + "&unit4=" + modTransports + "&unit5=" + modDroids
      }
      planetState.push(planet)
    };

    this.setState({ planets: planetState });
    this.setState({ planetList: event.target.value });
  }
  sendRaids() {

    for (var x = 0; x < this.state.planets.length; x++) {
      var wind = window.open(this.state.planets[x]["href"]);
      this.wait(1000);
      wind.close();
    };
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Row>
              <Col sm={8}>
                <Label for="exampleText" sm={4}>
                  Graduation Direction
            </Label>
                <Input type="select" name="select" id="exampleSelect"
                  value={this.state.modifierDirection}
                  onChange={(event) => {
                    this.setState({ modifierDirection: event.target.value });
                  }}
                >
                  <option>Decrease</option>
                  <option>Increase</option>
                </Input>

              </Col>
            </Row>
            <Row form>
              <Col sm={4}>
                <Label for="exampleText" sm={4}>
                  Base Fleet
                </Label>
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
                        this._fleetReady();
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
                        this._fleetReady();
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
                        this.setState({ transports: Math.ceil((Number(this.state.droids) + Number(event.target.value)) / 100) })
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
                        this.setState({ transports: Math.ceil((Number(this.state.soldiers) + Number(event.target.value)) / 100) })
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
                        this.setState({ transports: 0 });
                        this.setState({ transports: event.target.value });
                        this._fleetReady();
                      }}
                    />
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col sm={4}>

                {/* modifiers */}
                <ListGroup>
                  <Label for="exampleText" sm={4}>
                    Modifiers
                  </Label>
                  <ListGroupItem>
                    <Label>Bombers (#)</Label>
                    <Input
                      title="Bombers"
                      type="number"
                      id="bombers"
                      value={this.state.bombersModifier}
                      onChange={(event) => {
                        this.setState({ bombersModifier: event.target.value });
                      }}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    <Label>Fighters (%)</Label>
                    <Input
                      title="Fighters"
                      type="number"
                      id="fighters"
                      value={this.state.fightersModifier}
                      onChange={(event) => {
                        this.setState({ fightersModifier: event.target.value });
                      }}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    <Label>Soldiers (%)</Label>
                    <Input
                      title="Soldiers"
                      type="number"
                      id="soldiers"
                      value={this.state.soldiersModifier}
                      onChange={(event) => {
                        this.setState({ soldiersModifier: event.target.value });
                      }}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    <Label>Droids (%)</Label>
                    <Input
                      title="Droids"
                      type="number"
                      id="droids"
                      value={this.state.droidsModifier}
                      onChange={(event) => {
                        this.setState({ droidsModifier: event.target.value });
                      }}
                    />
                  </ListGroupItem>
                </ListGroup></Col>
              <Col sm={4}>
                <FormGroup>
                  <Label for="exampleText" sm={4}>
                    Planets
                  </Label>
                  <Input
                    type="textarea"
                    rows={20}
                    readOnly={this.state.readOnly}
                    title="Planet List"
                    id="planetList"
                    value={this.state.planetList}
                    onChange={
                      this._updatePlanets.bind(this)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button onClick={this._sendFleets}>Send Fleets!</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default RAIDSingle;
