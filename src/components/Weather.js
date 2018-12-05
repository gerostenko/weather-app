import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { fetchActions } from '../actions/fetchActions';

class Weather extends Component {
 
  componentWillMount() {
    this.props.fetchActions();
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const weatherItem = this.props.weatherForCurrent.map(weather => (
      <div key={weather.city}>
      <h1>Weather in {weather.city}</h1>
        <div> 
         <div>Temperature (in C): {weather.temp} </div><br/>
         <div>Humidity: {weather.humidity} </div><br/>
         <div> Wind speed (m/s): {weather.wind}</div>
       </div>
      </div>
    ));
  
    return (
      <div>
       {weatherItem}
       <div style={{'paddingTop': '20px'}}>
        <button onClick={this.props.fetchActions}>
          Refresh Weather Data
        </button>
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  fetchActions: PropTypes.func.isRequired,
  weatherForCurrent: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  weatherForCurrent: state.weatherForCurrent.item,
});

export default connect(mapStateToProps, { fetchActions })(Weather);