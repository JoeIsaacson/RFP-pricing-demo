'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.opp_overview'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/opp_overview'});
}]);
// Not sure what I am doing here
// Trying to Config DB
// Import a module from not sure where...
// import { SheetbaseModule } from 'sheetbase-angular';
// // Save a local config key pair
// export const SHEETBASE_CONFIG = {
//     // Must be JSON-liked format
//     "apiKey": "YFp4pRpr4tdMlWRc1JlXgOQh9VXFGj7C",
//     "backendUrl": "https://script.google.com/macros/s/AKfycbyON2n99mjFuvQBWMt5EmMgQ1KUQNVUkkHelPFo8A/exec"
// }
