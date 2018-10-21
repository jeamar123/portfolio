app.controller('mainController', function( $state, $scope , $rootScope, $stateParams){

	console.log( 'mainController running' );

	$scope.isRightShown = false;
	

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // console.log(fromState);
    // console.log(toState);
    $scope.current = toState.name;
  });

	$scope.toggleRightBox = ( ) => {
		if( $scope.isRightShown == false ){
			$scope.isRightShown = true;
		}else{
			$scope.isRightShown = false;
		}
	}
	
	$scope.onLoad = ( ) => {

	}

	$scope.onLoad();

});
