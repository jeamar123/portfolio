app.directive('messagesDirective', [
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
        console.log( "messagesDirective Runinng !" );

        scope.sendMessage = ( ) =>{
          var data = {
            notif : 'Alert!'
          }
          console.log(data);
          appModule.sendNotification( data )
            .then(function(response){
              console.log(response);
            });
          
        }

        scope.onLoad = ( ) =>{

        }

        scope.onLoad();

      }
    }


  }
])