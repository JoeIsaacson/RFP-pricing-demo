'use strict';

angular.module('myApp.opp_module', ['ngRoute'])

.controller('rfpListCtrl', function($scope, $filter) {

  $scope.rfpList = [{
    "name": "Pepsi",
    "create_date": 1,
    "start_date": 1,
    "end_date": 1,
    "due_date": 1,
    "last_updated": 1,
    "status_open": true
  },
  {
    "name": "Pepsi",
    "create_date": 2,
    "start_date": 2,
    "end_date": 2,
    "due_date": 2,
    "last_updated": 2,
    "status_open": false
  },{
    "name": "Pepsi",
    "create_date": 3,
    "start_date": 3,
    "end_date": 3,
    "due_date": 3,
    "last_updated": 3,
    "status_open": false
  },
  {
    "name": "Pepsi",
    "create_date": 3,
    "start_date": 3,
    "end_date": 3,
    "due_date": 3,
    "last_updated": 3,
    "status_open": false
  },
  {
    "name": "Pepsi",
    "create_date": 4,
    "start_date": 4,
    "end_date": 4,
    "due_date": 4,
    "last_updated": 4,
    "status_open": false
  },
  {
    "name": "Pepsi",
    "create_date": 5,
    "start_date": 5,
    "end_date": 5,
    "due_date": 5,
    "last_updated": 5,
    "status_open": false
  },
  {
    "name": "Uber Freight Ops LLC",
    "create_date": 3,
    "start_date": 3,
    "end_date": 3,
    "due_date": 3,
    "last_updated": 3,
    "status_open": false
  }
  ];
});
