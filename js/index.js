angular.module('mainapp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('test1', {
      url: "/test1",
      templateUrl: "partials/test1.html",
      controller: "test1ctrl"
    })
    .state('test2', {
      url: "/test2",
      templateUrl: "partials/test2.html",
      controller: "test2ctrl"
    })
    .state('test3', {
      url: "/test3",
      templateUrl: "partials/test3.html",
      controller: "test3ctrl"
    })
    .state('test4', {
      url: "/test4",
      templateUrl: "partials/test4.html",
      controller: "test4ctrl"
    })
})
.controller('mainctrl',function ($scope) {
  $scope.hello = "lloolll we are here again";
})
.controller('test1ctrl',function ($scope) {
  $scope.inp_a ;
  $scope.inp_b ;
  $scope.output;
  $scope.delet = 0 ;
  $scope.list_in_a = [];
  $scope.list_in_b = [];
  $scope.run = function(){
    $scope.delet = 0 ;
    $scope.list_in_a = [];
    $scope.list_in_b = [];
    // make lowercase and remove spacing
    $scope.inp_a = $scope.inp_a.replace(/[^A-Za-z]+/g, '').toLowerCase();
    $scope.inp_b = $scope.inp_b.replace(/[^A-Za-z]+/g, '').toLowerCase();
 // go ahead and create 2 array with freq of each char in both strings
    for (var i = 0; i < $scope.inp_a.length; i++) {
      if ($scope.list_in_a[$scope.inp_a[i]]) {
        $scope.list_in_a[$scope.inp_a[i]]++;
      }
      else {
        $scope.list_in_a[$scope.inp_a[i]] = 1 ;
      }
    }
    for (var i = 0; i < $scope.inp_b.length; i++) {
      if ($scope.list_in_b[$scope.inp_b[i]]) {
        $scope.list_in_b[$scope.inp_b[i]]++;
      }
      else {
        $scope.list_in_b[$scope.inp_b[i]] = 1 ;
      }
    }
  for (var c in $scope.list_in_a) {
    // existe in b
    if($scope.list_in_b[c])
    {
      // check the defernce in freq
      $scope.delet += Math.abs($scope.list_in_b[c] - $scope.list_in_a[c]);
    }
    else {
      // this char dosen't existe so we delet him
      $scope.delet += $scope.list_in_a[c];
    }
  }
  $scope.output = "we have de delet  "+$scope.delet+"  char ";
  }

})
.controller('test2ctrl',function ($scope) {
  $scope.inp_temp_a="" ;
  $scope.inp_temp_b="" ;
  $scope.inp_a = [];
  $scope.inp_b = [];
  $scope.res = [];
  $scope.output ;
  $scope.add = function(array,value){
    if (value.length ==0) {
      $scope.output = "empty no accepted :p " ;
      return false;
    }
    console.log(value + " => "+ array);
    switch (array) {
      case "a":
        $scope.inp_a.push(value);
        break;
      case "b":
        $scope.inp_b.push(value);
        break;
    }
    $scope.inp_temp_a = "" ;
    $scope.inp_temp_b = "" ;
  }
  $scope.run = function()
  {
    $scope.res = [];
    for (var i = 0; i < $scope.inp_b.length; i++) {
      $scope.res.push(0);
      for (var j = 0; j < $scope.inp_a.length; j++) {
        if ($scope.inp_b[i] == $scope.inp_a[j]) {
          $scope.res[i]++;
        }
      }
    }
    $scope.output =   "ok the result is =  ["+$scope.res+"]";
  }
})
.controller('test3ctrl',function ($scope) {
  $scope.inp_a = "";
  $scope.output;
  var pattern = /^[A-Z0-9._-]+$/gi;
  $scope.run = function()
  {
    if ($scope.inp_a.length == 0) {
      $scope.output = 0 ;
    }
    else if($scope.inp_a.match(pattern)){
      $scope.output = $scope.inp_a.split('.').length;
    }
    else {
      $scope.output = 0 ;
    }
  }
})
.controller('test4ctrl',function ($scope,$timeout) {
  $scope.alerting = function(){
    alert("woohoow finally called");
  }
  var timer;
  var first = 0 ;
  $scope.lastcalltime = new Date().getTime();
  $scope.f4 = function(fncallback){
    // it will run  only in first time or after 4000ms from the last run
    var d = new Date().getTime();
    if(d-$scope.lastcalltime >= 4000)
    {
      fncallback();
      first ++;
      $scope.lastcalltime = new Date().getTime();
      // to call again after the first call (for you to be able to test it )
      if(first == 0 )
      {
        $scope.f4(fncallback);
      }
    }
    else {
      // wait for other 400 ms
      $timeout.cancel(timer);
      timer = $timeout(function () {
        $scope.f4(fncallback);
      }, 4000);
    }
    $scope.lastcalltime = new Date().getTime();

  }
})
