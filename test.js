//set a reference to the request module
var request = require('request'),
    //stubs
    postData = {},
    postConfig = {},
    postSuccessHandler = null;

//create an object to send as POST data
postData = {
    makes: 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
    vehicleTypes: 'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml',
};

//the config for our HTTP POST request
postConfig = {
    url: 'http://localhost:3001/',
};

//the HTTP POST request success handler
postSuccessHandler = function (err, httpResponse, body) {
    //look for this message in your JS console:
    console.log('JSON response from the server: ' + body);
};

//make the POST request
request.get(postConfig, postSuccessHandler);
