import {Alert} from 'react-native';

// --------------------- Make backend requests ----------------- //

var baseURL = 'http://localhost:3000/';

exports.getFoodOptionAsync = function getFoodOptionAsync(distance, cost, rating) {
  makePostRequest(baseURL + 'food', distance, cost, rating)
  .then((response) => {
    getVenue(response);
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getDrinksOptionAsync = function getDrinksOptionAsync(distance, cost, rating) {
  makePostRequest(baseURL + 'drinks', distance, cost, rating)
  .then((response) => {
    getVenue(response);
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getCafeOptionAsync = function getCafeOptionAsync(distance, cost, rating) {
  makePostRequest(baseURL + 'cafe', distance, cost, rating)
  .then((response) => {
    getVenue(response);
  })
  .catch((error) => {
    console.error(error);
  });
}

exports.getRandomOptionAsync = function getRandomOptionAsync(distance, cost, rating) {
  makePostRequest(baseURL + 'random', distance, cost, rating)
  .then((response) => {
    getVenue(response);
  })
  .catch((error) => {
    console.error(error);
  });
}

// ----------------------------- Request Helpers ----------------------------//

function getVenue( response ){
  var body = JSON.parse(response)._bodyInit;
  var venues = JSON.parse( body );
  var venue = getOneVenue( venues );
  return venue;
}

function getOneVenue( venues ){
  var item = Math.floor(Math.random()*venues.length);
  var venue = venues[item];
  console.log( "Choosing item # = " + item + ", value = " +  venue.name );
  return venue;
}

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
    var resp = JSON.stringify( response);
    console.log(resp);
    return( resp );
  });
}
