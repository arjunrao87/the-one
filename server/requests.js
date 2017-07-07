var request=require('request');
var logger = require('./log.js')

var clientId     = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

exports.explore = function makeExploreRequest(response, key, latitude, longitude, price, radius){
  logger.info( "Received request for ''" + key + "''");
  if( key == "food" ){
    exploreWithParams( response, false, latitude, longitude, price, radius, "food", "restaurant" )
  } else if (key == "drinks") {
    exploreWithParams( response, false, latitude, longitude, price, radius, "bars", "beer", "wine" )
  } else if (key == "cafe") {
    exploreWithParams( response, false, latitude, longitude, price, radius, "coffee", "tea" )
  } else if (key == "trending") {
    exploreWithParams( response, true, latitude, longitude, price, radius, "trending" )
  } else{
    logger.info( "Unable to recognize the request type - " + key );
  }
}

function exploreWithParams( response, isTrending, latitude, longitude, price, radius, searchTerm1, searchTerm2, searchTerm3){
  var url1, url2, url3;
  if( isTrending ){
    url1 = makeTrendingURL(searchTerm1, latitude, longitude, price, radius );
  } else{
    if( searchTerm1 ){
      url1 = makeExploreURL( searchTerm1, latitude, longitude, price, radius );
    }
    if( searchTerm2 ){
      url2 = makeExploreURL( searchTerm2, latitude, longitude, price, radius );
    }
    if( searchTerm3 ){
      url3 = makeExploreURL( searchTerm3, latitude, longitude, price, radius );
    }
  }
  exploreRequest( response, url1, url2, url3 );
}

function makeExploreURL( searchTerm, latitude, longitude, price, radius ){
  return 'https://api.foursquare.com/v2/venues/explore?ll='+latitude+','+longitude+'&intent=browse&price='+price+'&radius='+radius+'&query='+searchTerm+'&client_id='+clientId+'&client_secret='+clientSecret+'&v=20170101';
}

function makeTrendingURL(searchTerm, latitude, longitude, price, radius){
  return 'https://api.foursquare.com/v2/venues/explore?ll='+latitude+','+longitude+'&intent=browse&price='+price+'&radius='+radius+'&section='+searchTerm+'&client_id='+clientId+'&client_secret='+clientSecret+'&v=20170101';
}

function exploreRequest( response, url1, url2, url3 ){
  if( url1 ){
    logger.info( "Making request 1 to " + url1 );
    request.get(url1,function(err,response1,body){
      if(err){
        logger.info( "Unable to make get request to server " + err );
      }
      if( url2 ){
        logger.info( "Making request 2 to " + url2 );
        request.get(url2,function(err,response2,body){
          if(err){
            logger.info( "Unable to make get request to server " + err );
          }
          if( url3 ){
            logger.info( "Making request 3 to " + url3 );
            request.get(url3,function(err,response3,body){
              if(err){
                logger.info( "Unable to make request to server " + err );
              }
              return exploreResponse( response, response1, response2, response3 );
            });
          } else{
            return exploreResponse( response, response1, response2 );
          }
        });
      } else{
        return exploreResponse( response, response1 );
      }
    });
  } else{
    console.error( "None of the URLs was valid." );
  }
}

function exploreResponse( response, response1, response2, response3 ){
  var venues = [];
  if( response1 ){
    var groups = JSON.parse(response1.body).response.groups;
    groups.forEach( group=> {
      group.items.forEach( item => {
        venues.push(item);
      });
      logger.info( "Retrieved " + group.items.length + " from response1." );
    });
  }
  if( response2 ){
    var groups = JSON.parse(response2.body).response.groups;
    groups.forEach( group=> {
      group.items.forEach( item => {
        venues.push(item);
      });
      logger.info( "Retrieved " + group.items.length + " from response2." );
    });
  }
  if( response3 ){
    var groups = JSON.parse(response3.body).response.groups;
    groups.forEach( group=> {
      group.items.forEach( item => {
        venues.push(item);
      });
      logger.info( "Retrieved " + group.items.length + " from response3." );
    });
  }
  logger.info( "Retrieved " + venues.length + " venues for request." );
  response.send( venues );
}
