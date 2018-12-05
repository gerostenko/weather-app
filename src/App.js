import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchActions } from './actions/fetchActions';


import Weather from './components/Weather';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Weather />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 });

 const mapDispatchToProps = dispatch => ({
  fetchActions: () => dispatch(fetchActions())
 })

 export default connect(mapStateToProps, mapDispatchToProps)(App);
