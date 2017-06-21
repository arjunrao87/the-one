import {Alert} from 'react-native';

// --------------------- Make backend requests ----------------- //

var baseURL = 'http://localhost:3000/';

exports.getFoodOptionAsync = function getFoodOptionAsync(distance, cost, rating) {
  makePostRequest(baseURL + 'food', distance, cost, rating)
  .then((responseJson) => {
    console.log( "Received response for food call" );
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getDrinksOptionAsync = function getDrinksOptionAsync(distance, cost, rating) {
  return makePostRequest(baseURL + 'drinks', distance, cost, rating)
  .then((responseJson) => {
    console.log( "Received response for drinks call" );
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getCafeOptionAsync = function getCafeOptionAsync(distance, cost, rating) {
  return makePostRequest(baseURL + 'cafe', distance, cost, rating)
  .then((responseJson) => {
    console.log( "Received response for cafe call" );
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getRandomOptionAsync = function getRandomOptionAsync(distance, cost, rating) {
  return makePostRequest(baseURL + 'random', distance, cost, rating)
  .then((responseJson) => {
    console.log( "Received response for random call" );
  })
  .catch((error) => {
    console.error(error);
  });
}

// ----------------------------- Request Helpers ----------------------------//

function makePostRequest(url,distance,cost,rating){
  console.log( "Making request to " + url );
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
       distance: distance,
       cost: cost,
       rating:rating,
    })
  }).then((response)=>{
    var resp = JSON.stringify( response);
    return resp;
  });
}

function makeGetRequest(type,distance,cost,rating){
  console.log( "Making get request for type = " + type );
  var response = fetch('http://localhost:3000/' + type);
  response.then( (response) => {
    console.log( "Made the request!!!!");
    var resp = JSON.stringify( response);
    console.log( resp);
    return( resp );
  });
}
