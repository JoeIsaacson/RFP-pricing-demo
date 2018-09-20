'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.opp_module',
  'myApp.exceptionView'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider, $httpClient) {
  $locationProvider.hashPrefix('!');
  $routeProvider.when('/all_ops', {
    templateUrl: 'opp_list/all_ops.html',
    controller: 'rfpListCtrl'
  })
  .when('/opp_uploader', {
    templateUrl: 'opp_list/opp_uploader.html',
    controller: 'exceptionCtrl'
  })
  .when('/opp_overview', {
    templateUrl: 'opp_overview/opp_overview.html',
    controller: 'exceptionCtrl'
  })
  .when('/lane_filter', {
    templateUrl: 'exception_tool/lane_filter.html',
    controller: 'exceptionCtrl'
  })
  .when('/exception_view', {
    templateUrl: 'exception_tool/exception_view.html',
    controller: 'exceptionCtrl'
  })
  .otherwise(
    {redirectTo: '/all_ops'}
  );
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
