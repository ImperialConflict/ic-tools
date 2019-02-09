import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Welcome = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Welcome to IC Fleet Tools</h1>
        <p className="lead">These are some simple tools, built by the community to help busy attackers work faster.</p>
        <hr className="my-2" />
        <p>These tools were inspired by some older tools (http://icfleet.gear.host/fleetElite.html#pgFleet)</p>
        <hr className="my-2" />
        <p>To honour our memory of these tools, I repeat their message: </p>
        <p> To my fellow Partaxiansz who have found this page, I wish a terrific round of hunting.  <br/>To those from the lesser races (any non-Partaxian), I assume you most likely found this link while surfing for kitten videos or selfies of Justin Beiber. <br/>Although I doubt you have the mental capacity to harm anyone but yourself by using this tool, by clicking the continue button below you agree to not use it to pester any Partaxian. </p>

        <p>Instructions are not provided. These are community tools, so speak with members of the IC community for advice and guidance! </p>
      </Jumbotron>
    </div>
  );
};

export default Welcome;