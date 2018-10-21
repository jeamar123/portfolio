app.directive('menuDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  function directive($http,$state,$stateParams,$rootScope) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "menuDirective Runinng !" );

        scope.isExpensesClicked = false;

        scope.toggleMenu = ( opt ) =>{
          if( opt == 'expenses' ){
            if( scope.isExpensesClicked == false ){
              scope.isExpensesClicked = true;
            }else{
              scope.isExpensesClicked = false;
            }
          }
        }

        scope.onLoad = ( ) =>{

        }

        scope.onLoad();

      }
    }


  }
])