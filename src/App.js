import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ReactGA from 'react-ga';

// common components
import Header from './common/Header'
import Footer from './common/Footer'
import FleetForm from "./fleet/containers/FleetForm";

import RAIDSingle from './fleet/containers/RAIDSingleFleets';
import Welcome from './fleet/containers/UserGuide';
import PopupAlert from './fleet/containers/PopupAlert'

ReactGA.initialize('UA-134195765-1', {
  debug: false,
  titleCase: false
});


ReactGA.pageview("homepage")
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
       <Header />
       <PopupAlert></PopupAlert>
       <Container>
        <Nav tabs>
        <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Hello!
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Basic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Raid
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Welcome></Welcome>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <FleetForm></FleetForm>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                 <RAIDSingle></RAIDSingle>
              </Col>
             
            </Row>
          </TabPane>
        </TabContent>
        </Container>
        <Footer />
      </div>
    );
  }
}