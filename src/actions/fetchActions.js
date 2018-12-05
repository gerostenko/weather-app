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
      parseString(response, (err, result) => {
        let rawResponse = JSON.parse(JSON.stringify(result)).current; 
        //creating the object with properly set props
        let weatherObj = parseWeatherObj(rawResponse);
        dispatch({
          type: FETCH_WEATHER,
          payload: Array.of(weatherObj)
        }
      )
    })})
  },
  error => {
    //sending empty obj to notify the consumer about the error
    dispatch({
      type: FETCH_WEATHER,
      payload: [{error: error.message}]
    });
  });
 };

 //helper func to parse the weather obj
function parseWeatherObj(rawResponse) {
  let weatherObj = {};
  Object.keys(rawResponse).forEach(key => {
    //wind is a special case, it's nested
    if(key === 'wind'){
      weatherObj[key] = {};
      Object.keys(rawResponse[key][0]).forEach(keysOfKey =>  {
        if(rawResponse[key][0][keysOfKey][0].hasOwnProperty("$"))
          weatherObj[key][keysOfKey] = rawResponse[key][0][keysOfKey][0]["$"];
        else
          weatherObj[key][keysOfKey] = rawResponse[key][0][keysOfKey][0];
      });
    }
    else 
      weatherObj[key] = rawResponse[key][0]["$"];
 });
 return weatherObj;
}