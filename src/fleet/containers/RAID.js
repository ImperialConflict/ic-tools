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

import { instanceOf } from 'prop-types';

class RAID extends React.Component {

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

      var wind = window.open(this.state.planets[i]["href"]);
      console.log(wind);
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
    var transports = Number(this.state.transports);

    var soldiersModifier = Number(this.state.soldiersModifier);
    var bombersModifier = Number(this.state.bombersModifier);
    var droidsModifier = Number(this.state.droidsModifier);
    var fightersModifier = Number(this.state.fightersModifier);

    var multiplicator = 0;

    if (this.state.modifierDirection === "Decrease") {
      multiplicator = -1;
    }
    else {
      multiplicator = +1;
    }

    for (var i = 0; i < this.state.iterations; i++) {
      var compoundMultiplicator = i * multiplicator;

      // eslint-disable-next-line no-loop-func
      planetArray.forEach(function (entry) {

        var modBombers = bombers + (bombersModifier * compoundMultiplicator);
        var modFighters = fighters + (fightersModifier * compoundMultiplicator);
        var modSoldiers = soldiers + (soldiersModifier * compoundMultiplicator);
        var modDroids = droids + (droidsModifier * compoundMultiplicator);
        var modTransports = Math.ceil((modDroids + modSoldiers) / 100);

        var something = entry.replace(',', ':').split(':');

        var planet = {
          key: entry,
          coords: entry,
          href: "https://imperialconflict.com/map-backend.php?what=attack&x=" + something[0] + "&y=" + something[1] + "&number=" + something[2] + "&unit1=" + modBombers + "&unit2=" + modFighters + "&unit3=" + modSoldiers + "&unit4=" + modTransports + "&unit5=" + modDroids
        }

        planetState.push(planet)
      });
    }

    this.setState({ planets: planetState });
    this.setState({ planetList: event.target.value });
  }
  sendRaids() {

    for (var x = 0; x < this.state.planets.length; x++) {
      console.log(this.state.planets.length)
      console.log(this.state.planets[x])
      var wind = window.open(this.state.planets[x]["href"]);
      console.log(wind);
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
              <Col sm={6}>
                <Label for="exampleText" sm={4}>
                  Iteration Direction
            </Label>
                <Input type="select" name="select" id="exampleSelect"
                  value={this.state.bombers}
                  onChange={(event) => {
                    this.setState({ modifierDirection: event.target.value });
                  }}
                >
                  <option>Decrease</option>
                  <option>Increase</option>
                </Input>
                <Label for="exampleText" className="float-right" sm={4}>
                  Iterations
            </Label>
                <Input className="float-right" type="number" name="Iterations" id="iterationSelect"
                  value={this.state.iterations}
                  onChange={(event) => {
                    this.setState({ iterations: event.target.value });
                  }}
                >
                </Input>
              </Col>
            </Row>
            <Row>
              <Label for="exampleText" sm={4}>
                Base Fleet
            </Label>
              <Label for="exampleText" sm={4}>
                Modifiers
            </Label>
              <Label for="exampleText" sm={4}>
                Planets
            </Label>
            </Row>
            <Row form>
              <Col sm={4}>
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
                        console.log("This was hit")
                        this.setState({ transports: 0 });
                        this.setState({ transports: event.target.value });
                        { this._fleetReady() };
                      }}
                    />
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col sm={4}>
                {/* modifiers */}
                <ListGroup>
                  <ListGroupItem>
                    <Label>Bombers</Label>
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
                    <Label>Fighters</Label>
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
                    <Label>Soldiers</Label>
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
                    <Label>Droids</Label>
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
                  <Input
                  minrows={8}
                    type="textarea"
                    autoFocus={true}
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

export default RAID;
