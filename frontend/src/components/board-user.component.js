import React, {Component} from "react";
import {AgGridReact} from 'ag-grid-react';
import AuthService from '../services/auth.service';
import WalletService from '../services/wallet.service';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import '../styles/board-user.css';

function actionCellRenderer() {
  let eGui = document.createElement("div");
  eGui.style.display = 'flex';
  eGui.style.alignItems = 'center';
  eGui.style.width = '100%';
  eGui.style.height = '100%';
  eGui.style.justifyContent = 'center';

  eGui.innerHTML = `<button class="action-button delete" style="display: flex; align-items: center; justify-content: center; width: 60px; height: 30px" data-action="delete" > Delete </button>`;
  return eGui;
}

export default class BoardUser extends Component {
  state = {
    isFormShown: false,
    name: '',
    position: 'Buy',
    volume: 0,
    price: 0,
    investments: []
  }

  handleSubmit = async (event) => {
    const {name, position, volume, price} = this.state;
    event.preventDefault();
    const user = AuthService.getCurrentUser();
    const data = await WalletService.addInvestment(user.id, {name, position, volume, price});

    this.setState({isFormShown: false, investments: data.investments, name: '', position: 'Buy', volume: 0, price: 0});
  }

  handleInputChanged(event, name) {
    this.setState({
      [name]: event.target.value
    });
  }

  async componentDidMount() {
    const user = AuthService.getCurrentUser();
    const data = await WalletService.getInvestments(user.id);

    this.setState({investments: data.investments});
  }

  handleClick = async (cell) => {
    if (cell.colDef.headerName === "Delete") {
      const user = AuthService.getCurrentUser();
      const data = await WalletService.deleteInvestment(user.id, cell.rowIndex);

      this.setState({investments: data.investments});
    }
  }

  handleEdit = async (cell) => {
    const user = AuthService.getCurrentUser();
    const data = await WalletService.editInvestment(user.id, cell.data);

    this.setState({investments: data.investments});
  }

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
      <div className="container d-flex flex-column align-items-center">
        <h3 style={style}>Your Investment Wallet</h3>
        <div style={{width: '1000px', marginBottom: '15px'}} className="d-flex justify-content-start">
          <button className="btn btn-secondary" onClick={() => this.setState({isFormShown: true})}>Add new investment
          </button>
        </div>
        {
          this.state.isFormShown && (
            <form className="board__form">
              <div className="form-group">
                <label htmlFor="investmentName">Investment name</label>
                <input required type="text" minLength={1} className="form-control" id="investmentName"
                       value={this.state.name}
                       onChange={(e) => this.handleInputChanged(e, 'name')}/>
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <select className="form-control" id="position" value={this.state.position}
                        onChange={(e) => this.handleInputChanged(e, 'position')}>
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Investment price</label>
                <input required type="number" className="form-control" id="price" value={this.state.price}
                       onChange={(e) => this.handleInputChanged(e, 'price')}/>
              </div>
              <div className="form-group">
                <label htmlFor="volume">Volume</label>
                <input required type="number" className="form-control" id="volume" value={this.state.volume}
                       onChange={(e) => this.handleInputChanged(e, 'volume')}/>
              </div>
              <input className="btn btn-dark" onClick={(event) => this.handleSubmit(event)} type="submit"
                     value="Add Investment"/>
            </form>
          )
        }
        <div className="ag-theme-alpine-dark" style={{height: 400, width: 1000}}>
          <AgGridReact
            onCellClicked={this.handleClick}
            rowData={this.state.investments}
            columnDefs={[
              {
                field: "name",
                sortable: true,
                filter: true,
                editable: true,
                onCellValueChanged: this.handleEdit
              },
              {
                field: "position",
                sortable: true,
                filter: true,
                editable: true,
                onCellValueChanged: this.handleEdit
              },
              {
                field: "price",
                sortable: true,
                filter: true,
                editable: true,
                onCellValueChanged: this.handleEdit
              },
              {
                field: "volume",
                sortable: true,
                filter: true,
                editable: true,
                onCellValueChanged: this.handleEdit
              },
              {
                headerName: "Delete",
                cellRenderer: actionCellRenderer,
                editable: false,
              }
            ]}
          />
        </div>
      </div>
    );
  }
}
