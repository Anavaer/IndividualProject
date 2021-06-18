import React, {Component} from "react";
import stonks from '../stofks.jpg'

export default class Home extends Component {
  render() {
    const style = {
      background: 'black',
      padding: '5px 10px',
      borderRadius: ' 7px',
      marginBottom: '19px',
      fontFamily: 'monospace',
      textAlign: 'center',
      color: 'white'
    }

    return (
      <div className="container align-items-center flex-column d-flex">
        <h3 style={style}>iStock - Application for Investment Wallet Management</h3>
        <img src={stonks} alt="stocks" style={{width: '1000px', height: '400px'}}/>
      </div>
    );
  }
}
