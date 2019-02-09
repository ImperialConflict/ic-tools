import React from 'react';
import { Alert } from 'reactstrap';

class PopupAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
        To ensure this tool can work, please whitelist this site for pop ups!
      </Alert>
    );
  }
}

export default PopupAlert;