'use strict';

// IMPORT JSON LANE DATA
// import {laneData} from 'lane_data.json';
// console.log(laneData)

angular.module('myApp.opp_module', ['ngRoute'])

.controller('exceptionCtrl', function($scope) {

    $scope.laneData = [{
      "pu":"Las Vegas, NV",
      "do": "New York, NY",
      "coverage": true,
      "lane_volume": 22,
      "miles": 2234,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chanview (spot)", "price": 200.23},
        {"name":"Chanview (contract)", "price": 200.23},
        {"name":"DAT (30 day)", "price": 200.23},
        {"name":"DAT (90 day)", "price": 200.23},
        {"name":"DAT (1 year)", "price": 200.23},
        {"name":"Uber Freight", "price": 200.23}
      ]
    },{
      "pu":"New York, NY",
      "do": "Boise, ID",
      "coverage": false,
      "lane_volume": 12,
      "miles": 1230,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chanview (spot)", "price": 139.00},
        {"name":"Chanview (contract)", "price": 190.25},
        {"name":"DAT (30 day)", "price": 195.20},
        {"name":"DAT (90 day)", "price": 115.25},
        {"name":"DAT (1 year)", "price": 140.50},
        {"name":"Uber Freight", "price": 155.25}
      ]
    },{
      "pu":"Laredo, TX",
      "do": "Austin, TX",
      "coverage": true,
      "lane_volume": 15,
      "miles": 329.5,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chanview (spot)", "price": 339.30},
        {"name":"Chanview (contract)", "price": 290.25},
        {"name":"DAT (30 day)", "price": 295.20},
        {"name":"DAT (90 day)", "price": 315.25},
        {"name":"DAT (1 year)", "price": 340.25},
        {"name":"Uber Freight", "price": 355.25}
      ]
    }];

    // Set up some basic variables for lane adjustments
    $scope.pressedKeys = 0;
    $scope.showMarkup = false;
    $scope.selectedMarkup = 10;
    $scope.selectedLaneVolume = 1;
    $scope.selectedLaneCoverage = 567;
    $scope.selectedLaneCoverage = 567 - ($scope.selectedLaneVolume * 1.2);

    // Set up some basic variables for exceptions
    $scope.selectedLane = 0;
    $scope.selectedIndex = 4;
    $scope.reasonlist = 0;
    $scope.increments = [0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2];
    $scope.baseEstimate = 0;
    $scope.showManual = false;

    // Progress calculations
    function calculateProgress() {
      $scope.progPercentage = 100 * (($scope.selectedLane + 1) / $scope.laneData.length);
      $scope.progPercentageStyle = {width: $scope.progPercentage + "%"};
    };

    // What is this function
    function calculateEstimateSum() {
      // To get the average estimate from the various data sources
      // 1. Set the estimate to 0
      $scope.baseEstimate = 0;
      // 2. Create a variable to loop through the array
      var estPrice = $scope.laneData[$scope.selectedLane].rates;
      // 3. Create a for loop to get the sum
      var i;
      // Run a for loop to get the entire estimate
      for (i = 0; i < estPrice.length; i++) {
        $scope.baseEstimate += estPrice[i].price;
      };
      // Update lower / upper bounds (estimate data)
      $scope.lowerBound = $scope.baseEstimate * $scope.increments[0];
      $scope.upperBound = $scope.baseEstimate * $scope.increments[9];
    };

    // Compare the base estimate to the adjusted estimate
    function updateAdjustedEstimate() {
      // Recalculate the estimate data
      $scope.selectedEstimate = $scope.baseEstimate * $scope.increments[$scope.selectedIndex];
    };

    // Compare the base estimate to the adjusted estimate
    function updateDifference() {
      // Adjust the base estimate vs adjusted estimate difference
      $scope.adjustedPercentage = (($scope.selectedEstimate - $scope.baseEstimate) / $scope.baseEstimate) * 100;
    };

    function selectManualInput() {
      var manualInput = document.getElementById('manualPrice');
      manualInput.focus();
    };

    // Rules of what happens when a key is hit
    function indexUpdate(key) {
      // These keys always work
      // Key 80 = P (Print number of keys pressed)
      if (key == 80) {
        alert("Numnber of keys pressed = " + $scope.pressedKeys);
      // Key 81 = Q (Quick select)
      } else if (key == 81) {
        $scope.showManual = false;
      // Key 67 = C (Custom entry)
      } else if (key == 67) {
      // Key 67 = C (Custom entry)
        $scope.showManual = true;
      } else if (key == 77) {
        $scope.showMarkup = !$scope.showMarkup;
      // Key 40 = down arrow (decrease reasonlist by 1)
      } else if ((key == 40) && ($scope.reasonlist <= 2)) {
        $scope.reasonlist += 1;
      // Key 38 = up arrow (increase reasonlist by 1)
      } else if ((key == 38) && ($scope.reasonlist > 0)) {
        $scope.reasonlist -= 1;
      // Key 13 = Enter (increase selected lane to move to next lane)
      } else if ((key == 13) && (($scope.selectedLane + 1) < ($scope.laneData.length+1))) {
        $scope.selectedLane += 1;
        $scope.selectedIndex = 2;
      };
      // These keys only work if manual mode is OFF
      if ($scope.showManual == false) {
        // Key 39 = right arrow (increase selected index by 1)
        if ((key == 39) && ($scope.selectedIndex < 8)) {
          $scope.selectedIndex += 1;
        // Key 39 = right arrow (move over to manual)
        } else if ((key == 39) && ($scope.selectedIndex == 8)) {
          $scope.showManual = true;
          console.log("wtf is happenings");
        // Key 37 = left arrow (descrese selected index by 1)
        } else if ((key == 37) && ($scope.selectedIndex > 0)) {
          $scope.selectedIndex -= 1;
        // Key 37 = left arrow (move over to manual)
        } else if ((key == 37) && ($scope.selectedIndex == 0)) {
          $scope.showManual = true;
        }
        // count the number of pressed keys
        $scope.pressedKeys += 1;
        console.log($scope.selectedIndex);
        // Run the cummulative function
        updateAdjustedEstimate();
      };
      // Update progress
      calculateProgress();
      // Update the estimate differences
      updateDifference();
      //Need to run this crazy apply to update everything that was set at the top here (WTF)
      $scope.$apply();
      // Run the update manual fucntion
      selectManualInput();
    };

    $scope.showAlert = function(message) {};

    // Run the calculate progress function
    calculateProgress();
    // Run the function to calculate the average estimate
    calculateEstimateSum();
    // Calculate difference between estimate and adjustment
    updateAdjustedEstimate();
    // Update the difference of estimates
    updateDifference();
    // Run the function on key hit
    document.onkeyup = function(e) {
      var hitKey = e.which;
      console.log(hitKey);
      indexUpdate(hitKey);
    };
});
