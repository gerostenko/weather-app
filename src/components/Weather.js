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
    //alerts error if any
    const weatherItem = this.props.weatherForCurrent.length !== 0 &&
    this.props.weatherForCurrent[0].hasOwnProperty('error') ?
    alert("Error: " + this.props.weatherForCurrent[0].error) :
    this.props.weatherForCurrent.map(weather => (
      <div key={weather.city.id}>
        <h1>Weather in {weather.city.name}</h1>
          <div>       
            <div>Temperature: {weather.temperature.value} C </div><br/>
            <div>Clouds: {weather.clouds.value} with {weather.clouds.name} </div><br/>
            <div>Humidity: {weather.humidity.value}{weather.humidity.unit} </div><br/>
            <div>Precipitation: {weather.precipitation.mode} </div><br/>
            <div>Pressure: {weather.pressure.value} {weather.pressure.unit} </div><br/>            
            <div>Wind Speed: {weather.wind.speed.value}m/s </div><br/>
            <div>Wind Direction: {weather.wind.direction.name} </div><br/>
            <div>Last Updated: {weather.lastupdate.value}</div><br/>      
          </div>
          <div>
            <button onClick={this.props.fetchActions}>
              Refresh Weather Data
            </button>
          </div>
      </div>)
  );
  
    return (
      <div>
       {weatherItem}
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