var appService = angular.module('appService', [])

appService.factory('appModule', function( serverUrl, $http ){
  var appFactory = {};

  // appFactory.sendNotification = function( data ) {
  //   return $http.post('http://handsomedev.com:8080/api/notify', data);
  // };

  appFactory.loginUser = function( data ) {
  	
    return $http.post(serverUrl.url + 'api/login', data);
  };

  appFactory.signupUser = function( data ) {
    return $http.post(serverUrl.url + 'api/signup', data);
  };

  // EXPENSES

  appFactory.getExpensesPerMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/month', data);
  };

  appFactory.submitExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/add', data);
  };

  appFactory.saveExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/update', data);
  };

  appFactory.removeExpenses = function( data ) {
    return $http.post(serverUrl.url + 'api/expenses/delete', data);
  };

  // INVESTMENTS

  appFactory.getInvestmentsPerMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/investments/month', data);
  };

  appFactory.submitInvestments = function( data ) {
    return $http.post(serverUrl.url + 'api/investments/add', data);
  };

  appFactory.saveInvestments = function( data ) {
    return $http.post(serverUrl.url + 'api/investments/update', data);
  };

  appFactory.removeInvestments = function( id ) {
    return $http.get(serverUrl.url + 'api/investments/delete/' + id);
  };

  // INVESTMENTS

  appFactory.getAssetsPerMonth = function( data ) {
    return $http.post(serverUrl.url + 'api/income/month', data);
  };

  appFactory.submitAssets = function( data ) {
    return $http.post(serverUrl.url + 'api/income/add', data);
  };

  appFactory.saveAssets = function( data ) {
    return $http.post(serverUrl.url + 'api/income/update', data);
  };

  appFactory.removeAssets = function( id ) {
    return $http.get(serverUrl.url + 'api/income/delete/' + id);
  };


  return appFactory;
});