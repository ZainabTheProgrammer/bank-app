import React, { Component } from 'react';

class BalanceDisplay extends Component {
  componentDidMount() {
    console.log("BalanceDisplay mounted");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.balance !== this.props.balance) {
      console.log("Balance updated:", this.props.balance);
    }
  }

  render() {
    const { balance } = this.props;
    return <h2>Current Balance: ${balance}</h2>;
  }
}

export default BalanceDisplay;
