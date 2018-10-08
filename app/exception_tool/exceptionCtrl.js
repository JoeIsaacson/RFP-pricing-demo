'use strict';

angular.module('myApp.exceptionView', ['ngRoute'])

.controller('exceptionCtrl', function($scope, $filter) {

    $scope.laneData = [{
      "pu":"Las Vegas, NV",
      "pu_zip": 89106,
      "do": "New York, NY",
      "do_zip": 10009,
      "coverage": true,
      "lane_volume": 22,
      "miles": 2234,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chainalytics (spot)", "price": 1000.23},
        {"name":"Chainalytics (contract)", "price": 1350.6},
        {"name":"DAT Rateview (30 day)", "price": 1129.45},
        {"name":"DAT Rateview (90 day)", "price": 1205.45},
        {"name":"DAT Rateview (1 year)", "price": 1233.45},
        {"name":"Uber Freight", "price": 1144.45}
      ]
    },{
      "pu":"New York, NY",
      "pu_zip": 89106,
      "do": "Boise, ID",
      "do_zip": 89106,
      "coverage": false,
      "lane_volume": 12,
      "miles": 1230,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chainalytics (spot)", "price": 139.00},
        {"name":"Chainalytics (contract)", "price": 190.25},
        {"name":"DAT Rateview (30 day)", "price": 195.20},
        {"name":"DAT Rateview (90 day)", "price": 115.25},
        {"name":"DAT Rateview (1 year)", "price": 140.50},
        {"name":"Uber Freight", "price": 155.25}
      ]
    },{
      "pu":"Laredo, TX",
      "pu_zip": 89106,
      "do": "Austin, TX",
      "do_zip": 89106,
      "coverage": true,
      "lane_volume": 15,
      "miles": 329.5,
      "rate_date": "2012-04-23T18:25:43.511Z",
      "rates": [
        {"name":"Chainalytics (spot)", "price": 339.30},
        {"name":"Chainalytics (contract)", "price": 290.25},
        {"name":"DAT Rateview (30 day)", "price": 295.20},
        {"name":"DAT Rateview (90 day)", "price": 315.25},
        {"name":"DAT Rateview (1 year)", "price": 340.25},
        {"name":"Uber Freight", "price": 355.25}
      ]
    }];

    // Set up some basic variables for lane adjustments
    $scope.pressedKeys = 0;
    $scope.showMarkup = false;
    $scope.selectedLaneVolume = 1;
    $scope.selectedLaneCoverage = 567;
    $scope.selectedLaneCoverage = 567 - ($scope.selectedLaneVolume * 1.2);

    // Set up some basic variables for exceptions
    $scope.selectedLane = 0;
    $scope.selectedIndex = 0;
    $scope.truckCostIndex = 5;
    $scope.reasonlist = 0;
    $scope.markupIncrements = [0,.02,.04,.06,.08,.1,.12,.14,.16,.18,.2];
    $scope.truckCostIncrements = [1,1.02,1.04,1.06,1.08,1.1];
    $scope.baseEstimate = 0;
    $scope.showManual = false;
    $scope.showTruckCostAdjustment = false;

    // Set up some basic calculations
    $scope.truckCost = $scope.baseEstimate * $scope.truckCostIncrements[$scope.truckCostIndex];

    // Progress calculations
    function calculateProgress() {
      $scope.progPercentage = 100 * (($scope.selectedLane + 1) / $scope.laneData.length);
      $scope.progPercentageStyle = {width: $scope.progPercentage + "%"};
    };

    // Update the estimate
    function calculateEstimateSum() {
      // To get the average estimate from the various data sources
      // 1. Set the estimate to 0
      var estimateSum = 0;
      // 2. Create a variable to loop through the array
      var estPrice = $scope.laneData[$scope.selectedLane].rates;
      // 3. Create a for loop to get the sum
      var i;
      // Run a for loop to get the entire estimate
      for (i = 0; i < estPrice.length; i++) {
        estimateSum += estPrice[i].price;
      };
      $scope.baseEstimate = estimateSum / 5;
      // Update lower / upper bounds (estimate data)
      $scope.lowerTruckCostBound = $scope.baseEstimate * $scope.truckCostIncrements[10];
      $scope.upperTruckCostBound = $scope.baseEstimate * $scope.truckCostIncrements[20];
    };

    // Update the truck cost based on the selected estimate
    function updateTruckCost() {
      // Recalculate the truck cost estimate
      $scope.truckCost = $scope.baseEstimate * $scope.truckCostIncrements[$scope.truckCostIndex];
    };

    // Compare the base estimate to the adjusted estimate
    function updateAdjustedEstimate() {
      // Recalculate the estimate data
      $scope.selectedEstimate = $scope.truckCost * (1 + $scope.markupIncrements[$scope.selectedIndex]);
    };

    // Compare the base estimate to the adjusted estimate
    function updateDifference() {
      // Adjust the base estimate vs adjusted estimate difference
      $scope.adjustedPercentage = (($scope.selectedEstimate - $scope.baseEstimate) / $scope.baseEstimate) * 100;
    };

    function selectManualInput() {
      if ($scope.showManual == false) {
        $scope.showManual = true;
        var manualInput = document.getElementById('manualPrice');
        manualInput.focus();
      };
    };

    // Rules of what happens when a key is hit
    function indexUpdate(key) {
      // These keys always work
      // Key 80 = P (Print number of keys pressed)
      if (key == 80) {
        alert("Numnber of keys pressed = " + $scope.pressedKeys);
      // Key 65 (Decrease truck cost)
      } else if ((key == 65) && ($scope.truckCostIndex > 0)) {
        $scope.truckCostIndex -= 1;
        $scope.showTruckCostAdjustment = true;
      // Key 68 = d (Increase truck cost)
      } else if ((key == 68) && ($scope.truckCostIndex <= $scope.truckCostIncrements.length)) {
        $scope.truckCostIndex += 1;
        $scope.showTruckCostAdjustment = true;
      // Key 40 = down arrow (decrease reasonlist by 1)
      } else if ((key == 40) && ($scope.reasonlist <= 2)) {
        $scope.reasonlist += 1;
      // Key 38 = up arrow (increase reasonlist by 1)
      } else if ((key == 38) && ($scope.reasonlist > 0)) {
        $scope.reasonlist -= 1;
      // Key 13 = Enter (increase selected lane to move to next lane)
      } else if ((key == 13) && (($scope.selectedLane + 1) < ($scope.laneData.length+1))) {
        $scope.selectedLane += 1;
      // Key 39 = right arrow (increase selected index by 1)
      } else if ((key == 39) && ($scope.selectedIndex < $scope.markupIncrements.length)) {
        $scope.selectedIndex += 1;
      // Key 39 = left arrow (decrease selected index by 1)
      } else if ((key == 37) && ($scope.selectedIndex > 0)) {
        $scope.selectedIndex -= 1;
      };
      //If there is still some lane data then run these functions
      if ($scope.selectedLane < $scope.laneData.length) {
        // Update the estimate
        calculateEstimateSum();
        // Updat the truck cost
        updateTruckCost();
        // Run the cummulative function
        updateAdjustedEstimate();
        // Update progress
        calculateProgress();
        // Update the estimate differences
        updateDifference();
        //Need to run this crazy apply to update everything that was set at the top here (WTF)
      };
      // count the number of pressed keys
      $scope.pressedKeys += 1;
      $filter('number')($scope.truckCost, 0);
      $scope.$apply();
    };

    $scope.showAlert = function(message) {};

    // Run the calculate progress function
    calculateProgress();
    // Run the function to calculate the average estimate
    calculateEstimateSum();
    // Update the truck cost based on the estimate
    updateTruckCost()
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
