function getFoodOptionAsync(distance, cost, rating) {
  return makePostRequest("food", distance, cost, rating)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getDrinksOptionAsync(distance, cost, rating) {
  return makePostRequest("food", distance, cost, rating)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getFunOptionAsync(distance, cost, rating) {
  return makePostRequest("food", distance, cost, rating)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCafeOptionAsync(distance, cost, rating) {
  return makePostRequest("food", distance, cost, rating)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getRandomOptionAsync(distance, cost, rating) {
  return makePostRequest("food", distance, cost, rating)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function makePostRequest(type,distance,cost,rating){
  return fetch('https://localhost:3000/'+type, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location: 'yourValue',
      cost: 'yourOtherValue',
      rating:'',
    })
  })
}
