var request=require('request');

var clientId     = "KSSXQD155NJQGZFD3WQ5SRVZIQUBH3FMMCN0PWYMQW1QGUNI";
var clientSecret = "OSAT4UI0C0Z3CPJ1BIGSCOHODNPFJRGU31ZO4RQR3DLYUHGF" ;
var responses = {};
var cache = {};
var isFirstCrawl = true;

exports.requestForKey = function makeSearchRequest(response, key){
  console.log( "Received request for ''" + key + "''");
  response.send( cache[key] );
}

//========== Background processes to retrieve data from 3rd Party API =======//

exports.scheduleCrawl = function startCrawlers(){
  if( isFirstCrawl ){
    startCrawl();
    isFirstCrawl = false;
  }
  setInterval(startCrawl, 300*1000);
  console.log( "Refreshing the crawled data every 5 minutes..." );
}

function startCrawl(){
  cacheForKey("food", false, "food", "restaurant")
  cacheForKey("drinks", false, "bars", "beer", "wine");
  cacheForKey("cafe", false,"coffee", "tea");
  cacheForKey("random", true);
  cacheForKey("test", false, "food", "restaurant");
}

function cacheForKey(key, isTrending, searchTerm1, searchTerm2, searchTerm3){
  var url1, url2, url3;
  console.log( "This is a trending request = " + isTrending );
  if ( isTrending ){
    url1 = "https://api.foursquare.com/v2/venues/trending?near=nyc&intent=browse&limit=50&client_id=KSSXQD155NJQGZFD3WQ5SRVZIQUBH3FMMCN0PWYMQW1QGUNI&client_secret=OSAT4UI0C0Z3CPJ1BIGSCOHODNPFJRGU31ZO4RQR3DLYUHGF&v=20170101";
  } else{
    if( searchTerm1 ){
      url1 = constructURL( searchTerm1 );
    }
    if( searchTerm2 ){
      url2 = constructURL( searchTerm2 );
    }
    if( searchTerm3 ){
      url3 = constructURL( searchTerm3 );
    }
  }
  requestWithURL( key, url1, url2, url3 );
}

function constructURL( searchTerm ){
  return 'https://api.foursquare.com/v2/venues/search?near=nyc&intent=browse&limit=50&query='+searchTerm+'&client_id='+clientId+'&client_secret='+clientSecret+'&v=20170101';
}

function requestWithURL( key, url1, url2, url3 ){
  if( url1 ){
    console.log( "Making request 1 to " + url1 );
    request.get(url1,function(err,response1,body){
      if(err){
        console.log( "Unable to make get request to server " + err );
      }
      if( url2 ){
        console.log( "Making request 2 to " + url2 );
        request.get(url2,function(err,response2,body){
          if(err){
            console.log( "Unable to make get request to server " + err );
          }
          if( url3 ){
            console.log( "Making request 3 to " + url3 );
            request.get(url3,function(err,response3,body){
              if(err){
                console.log( "Unable to make request to server " + err );
              }
              return cacheResponse( key, response1, response2, response3 );
            });
          } else{
            return cacheResponse( key, response1, response2 );
          }
        });
      } else{
        return cacheResponse( key, response1 );
      }
    });
  } else{
    console.error( "None of the URLs was valid." );
  }
}

function cacheResponse( key, response1, response2, response3 ){
  if( response1 ){
    var venues = [];
    JSON.parse(response1.body).response.venues.forEach(function(venue){
      venues.push( venue );
    });;
  }
  if( response2 ){
    JSON.parse(response2.body).response.venues.forEach(function(venue){
      venues.push( venue );
    });;
  }
  if( response3 ){
    JSON.parse(response3.body).response.venues.forEach(function(venue){
      venues.push( venue );
    });;
  }
  cache[key] = venues;
  console.log( "Cached " + venues.length + " items for key = " + key );
}
