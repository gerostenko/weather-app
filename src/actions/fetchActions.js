import { FETCH_WEATHER } from './type';

const apiKey = 'e56c2e0f598dd0dbbcfb4cd526034c63';
const parseString = require('react-native-xml2js').parseString;

export const fetchActions = () => dispatch => {
  //get geolocation
  navigator.geolocation.getCurrentPosition(location => {
    //get weather for current location in XML
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + location.coords.latitude + 
      '&lon=' + location.coords.longitude + '&units=metric&mode=xml&APPID=' + apiKey)  
    .then(res => res.text())
    .then((response) => {
      //stringify xml and parse it to JS object
      parseString(response, function (err, result) {
        let rawResponse = JSON.parse(JSON.stringify(result)); 
          var weatherObj = {};
          //getting only what I need
          weatherObj.city = rawResponse.current.city[0]["$"].name;
          weatherObj.humidity =  rawResponse.current.humidity[0]["$"].value;
          weatherObj.temp = rawResponse.current.temperature[0]["$"].value;
          weatherObj.wind = rawResponse.current.wind[0].speed[0]["$"].value;
          dispatch({
            type: FETCH_WEATHER,
            payload: Array.of(weatherObj)
          }
        )
      })})

  // this version uses JSON provided by OWM API (map the object here so both versions can be used interchangeably)
  //   fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + location.coords.latitude + 
  //   '&lon=' + location.coords.longitude + '&units=metric&APPID=' + apiKey)  
  //   .then(res => res.json())
  //     .then(weatherForCurrent => {
  //       var weatherObj = {};
  //       weatherObj.city = weatherForCurrent.name;
  //       weatherObj.humidity = weatherForCurrent.main.humidity;
  //       weatherObj.temp = weatherForCurrent.main.temp;
  //       weatherObj.wind = weatherForCurrent.wind.speed;
  //       dispatch({
  //         type: FETCH_WEATHER,
  //         payload: Array.of(weatherObj)
  //       }
  //     )
  //   }
  // )
  },
  error => {
    console.log('location error', error);
  });
 };