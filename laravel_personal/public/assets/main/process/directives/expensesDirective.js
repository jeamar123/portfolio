app.directive('expensesDirective', [
  '$http',
  '$state',
  '$stateParams',
  '$rootScope',
  'appModule',
  function directive($http,$state,$stateParams,$rootScope,appModule) {
    return {
      restrict: "A",
      scope: true,
      link: function link( scope, element, attributeSet )
      {
        console.log( "expensesDirective Runinng !" );

        scope.weekdays_long = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
        scope.weekdays_short = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
        scope.months_list = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ];
        scope.years_range_list = [ '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ];
        scope.temp_years_range_list = [ '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022' ];

        scope.full_date_today = moment( ).format( 'MMMM DD, YYYY' );
        scope.month_today = moment( scope.full_date_today ).format( 'MMMM' );
        scope.month_today_short = moment( scope.full_date_today ).format( 'MMM' );
        scope.day_today = moment( scope.full_date_today ).format( 'DD' );
        scope.year_today = moment( scope.full_date_today ).format( 'YYYY' );

        scope.startDayOfMonth = moment( scope.full_date_today ).startOf("month").format( 'd' );
        scope.startOfMonth = moment( scope.full_date_today ).startOf("month").format( 'DD' );
        scope.endOfMonth = moment( scope.full_date_today ).endOf("month").format( 'DD' );

        scope.calendar_arr = [];
        scope.expenses_arr = [];
        scope.investments_arr = [];
        scope.assets_arr = [];

        scope.weeks_total = [];
        scope.monthly_income_total = 0;
        scope.monthly_investments_total = 0;
        scope.monthly_expenses_total = 0;
        scope.monthly_balance = 0;

        scope.date_modal_view = 0;

        scope.expenses_selected_checkbox = [];
        scope.expenses_selected = [];
        scope.expenses_selected_ids = [];

        scope.selected_date = {};
        scope.add_expenses = {};
        scope.expense_update_data = {};
        scope.add_investment = {};
        scope.add_asset = {};

        scope.showSelectYear = false;


        scope.prevYearRange = ( ) =>{
          var first_year = parseInt(scope.years_range_list[0]) - 12;
          var ctr = 0;
          scope.years_range_list = [];
          while( ctr != 12 ){
            scope.years_range_list.push( first_year + ctr );
            ctr++;
          }
        }

        scope.nextYearRange = ( ) =>{
          var first_year = parseInt(scope.years_range_list[0]) + 12;
          var ctr = 0;
          scope.years_range_list = [];
          while( ctr != 12 ){
            scope.years_range_list.push( first_year + ctr );
            ctr++;
          }
        }

        scope.toggleSelectYearMonth = ( ) =>{
          if( scope.showSelectYear == true ){
            scope.showSelectYear = false;
          }else{
            scope.showSelectYear = true;
          }
        }

        scope.selectYear = ( year ) =>{
          scope.temp_years_range_list = scope.temp_years_range_list;
          scope.full_date_today = moment( scope.month_today + " " + scope.day_today + ", " + year ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
          scope.toggleSelectYearMonth();
        }

        scope.prevYear = ( ) =>{
          scope.full_date_today = moment( scope.full_date_today ).subtract( 1, 'year' ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
        }

        scope.nextYear = ( ) =>{
          scope.full_date_today = moment( scope.full_date_today ).add( 1, 'year' ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
        }

        scope.selectMonth = ( month ) =>{
          scope.full_date_today = moment( month + " " + scope.day_today + ", " + scope.year_today ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
        }

        scope.prevMonth = ( ) =>{
          scope.full_date_today = moment( scope.full_date_today ).subtract( 1, 'month' ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
        }

        scope.nextMonth = ( ) =>{
          scope.full_date_today = moment( scope.full_date_today ).add( 1, 'month' ).format( 'MMMM DD, YYYY' );
          scope.setDateValues();
        }

        scope.selectExpensesItem = ( index, opt, list ) =>{
          if( opt == true ){
            scope.expenses_selected.push( list );
            scope.expenses_selected_ids.push( list.id );
          }else{
            var temp_index = $.inArray( list, scope.expenses_selected );
            scope.expenses_selected.splice( temp_index, 1 );
            scope.expenses_selected_ids.splice( temp_index, 1 );
          }
          scope.expense_update_data = scope.expenses_selected[0];
        }

        scope.setDateModalView = ( opt ) =>{
          scope.date_modal_view = opt;
          if( opt == 0 ){
            scope.add_expenses = {};
            scope.expense_update_data = {};
            scope.expenses_selected_checkbox = [];
            scope.expenses_selected = [];
            scope.expenses_selected_ids = [];
          }
        }

        scope.openAddExpensesModal = ( data ) =>{
          scope.selected_date = data;
          $("#showDateModal").modal('show');
        }

        scope.openAddInvestmentsModal = ( data ) =>{
          $("#showInvestmentsModal").modal('show');
        }

        scope.openAddAssetsModal = ( data ) =>{
          $("#showAssetsModal").modal('show');
        }

        scope.toggleCalendarSelector = () =>{
          $("#showSelectMonthYearModal").modal('show');
        }

        scope.setDateValues = ( ) =>{
          scope.month_today = moment( scope.full_date_today ).format( 'MMMM' );
          scope.month_today_short = moment( scope.full_date_today ).format( 'MMM' );
          scope.day_today = moment( scope.full_date_today ).format( 'DD' );
          scope.year_today = moment( scope.full_date_today ).format( 'YYYY' );

          scope.startDayOfMonth = moment( scope.full_date_today ).startOf("month").format( 'd' );
          scope.startOfMonth = moment( scope.full_date_today ).startOf("month").format( 'DD' );
          scope.endOfMonth = moment( scope.full_date_today ).endOf("month").format( 'DD' );

          scope.onLoad();
        }

        scope.resetValues = ( ) =>{
          scope.add_expenses = {};
          scope.expense_update_data = {};
          scope.date_modal_view = 0;
          scope.expenses_selected_checkbox = [];
          scope.expenses_selected = [];
          scope.expenses_selected_ids = [];
          scope.selected_date = {};
          scope.add_investment = {};
          scope.add_asset = {};
          scope.showSelectYear = false;
          scope.years_range_list = scope.temp_years_range_list;
        }

        // INITIALIZATIONS //

        scope.initializeCalendar = ( picked_date ) =>{
          scope.calendar_arr = [];
          scope.weeks_total = [];
          scope.monthly_expenses_total = 0;
          scope.monthly_balance = 0;

          var date_ctr = 0;
          var weekday_ctr = scope.startDayOfMonth == 0 ? 7 : scope.startDayOfMonth;
          var week_ctr = 1;
          var temp_expense_arr = [];
          var date_expenses_total = 0;
          var week_total = 0;

          scope.calendar_arr.push({ week : [] });
          for(var i = weekday_ctr; i != 1; i--){
            scope.calendar_arr[week_ctr-1].week.push({
              enabled : false
            });
          }

          while( date_ctr != scope.endOfMonth ){
            date_ctr++;

            angular.forEach( scope.expenses_arr, function( value, key ){
              var expense_date = moment( value.full_date ).format('MMMM DD, YYYY');
              var compare_date = moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('MMMM DD, YYYY');
              if( expense_date == compare_date ){
                temp_expense_arr.push(value);
                date_expenses_total+= value.value;
              }
            });

            scope.calendar_arr[week_ctr-1].week.push({
              date : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('MMMM DD, YYYY'),
              date_number : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('DD'),
              date_month : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('MMMM'),
              date_year : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('YYYY'),
              day_name_short : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('ddd'),
              day_name_long : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('dddd'),
              day_number : moment( scope.month_today + ' ' + date_ctr + ', ' + scope.year_today ).format('d'),
              enabled : true,
              expenses_list : temp_expense_arr,
              expenses_total : date_expenses_total
            });

            week_total += date_expenses_total;
            scope.monthly_expenses_total += date_expenses_total;

            temp_expense_arr = [];
            date_expenses_total = 0;

            if( weekday_ctr < 7 ){
              weekday_ctr++;

              if( date_ctr == scope.endOfMonth ){
                scope.weeks_total.push( week_total );
              }
            }else{
              if( date_ctr != scope.endOfMonth ){
                scope.calendar_arr.push({ week : [] });
                scope.weeks_total.push( week_total );
              }

              week_total = 0;
              weekday_ctr = 1;
              week_ctr++;
            }
          }

          for(var i = (weekday_ctr-1); i < 7; i++){
            if( scope.calendar_arr[week_ctr-1] != undefined ){
              scope.calendar_arr[week_ctr-1].week.push({
                enabled : false
              });
            }
          }

          scope.monthly_balance = scope.monthly_income_total - ( scope.monthly_investments_total + scope.monthly_expenses_total );
          scope.hideLoading();
        }

        scope.initializeChart = ( ) =>{
          scope.expensesChartLabels = ['A','B','C','D','E'];
          scope.expensesChartData = [1,2,3,4,5];

          scope.expensesChartOptions = {
            legend: {
              display: true,
              position: 'left',
              labels: {
                  // fontColor: 'rgb(255, 99, 132)'
                  fontStyle: 'bold',
                  fontSize: 14,
                  boxWidth: 10,
              },
            },
          }
        }




        // HTTP REQUESTS //

        scope.deleteExpenses =  ( ) =>{
          swal({
            title: "Confirm",
            text: "are you sure you want to delete these items?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top"
          }, function(isTrue){
            if(isTrue){
              var data = {
                ids_arr : scope.expenses_selected_ids
              }

              appModule.removeExpenses( data )
                .then(function(response){
                  console.log(response);
                  if( response.data.status == true ){
                    scope.swalShow( response.data.message, 'success' );
                    $('.modal').modal('hide');
                    scope.onLoad();
                  }else{
                    swalShow( response.data.message, 'error' );
                  }
                });
            }
          });
        }

        scope.updateExpenses =  ( update_data ) =>{
          appModule.saveExpenses( update_data )
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.swalShow( response.data.message, 'success' );
                $('.modal').modal('hide');
                scope.onLoad();
              }else{
                swalShow( response.data.message, 'error' );
              }
            });  
        }

        scope.addExpenses =  ( add_data ) =>{
          var data = {
            full_date : moment( scope.selected_date.date ).format( 'YYYY-MM-DD' ),
            day : moment( scope.selected_date.date ).format( 'D' ),
            month : moment( scope.selected_date.date ).format( 'MM' ),
            year : moment( scope.selected_date.date ).format( 'YYYY' ),
            category : null,
            description : add_data.description,
            value : add_data.value,
          }

          appModule.submitExpenses( data )
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.swalShow( response.data.message, 'success' );
                $('.modal').modal('hide');
                scope.onLoad();
              }else{
                swalShow( response.data.message, 'error' );
              }
            });  
        }

        scope.fetchExpenses = ( date ) =>{
          scope.expenses_arr = [];
          var data = {
            start : moment( date ).startOf("month").format( 'MMMM DD, YYYY' ),
            end : moment( date ).endOf("month").format( 'MMMM DD, YYYY' )
          }

          appModule.getExpensesPerMonth( data )
            .then(function(response){
              // console.log(response);
              scope.expenses_arr = response.data.expenses;
              scope.initializeChart();
              scope.initializeCalendar( date );
            });
        }

        scope.deleteInvestment =  ( id ) =>{
          swal({
            title: "Confirm",
            text: "are you sure you want to delete this?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top"
          }, function(isTrue){
            if(isTrue){
              appModule.removeInvestments( id )
                .then(function(response){
                  console.log(response);
                  if( response.data.status == true ){
                    scope.swalShow( response.data.message, 'success' );
                    $('.modal').modal('hide');
                    scope.onLoad();
                  }else{
                    swalShow( response.data.message, 'error' );
                  }
                });
            }
          });
        }

        scope.addInvestments =  ( add_data ) =>{
          var data = {
            full_date : moment( scope.selected_date.date ).format( 'YYYY-MM-DD' ),
            day : moment( scope.selected_date.date ).format( 'D' ),
            month : moment( scope.selected_date.date ).format( 'MM' ),
            year : moment( scope.selected_date.date ).format( 'YYYY' ),
            description : add_data.description,
            value : add_data.value,
          }

          appModule.submitInvestments( data )
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.swalShow( response.data.message, 'success' );
                $('.modal').modal('hide');
                scope.onLoad();
              }else{
                swalShow( response.data.message, 'error' );
              }
            });  
        }

        scope.fetchInvestments = ( date ) =>{
          scope.investments_arr = [];
          scope.monthly_investments_total = 0;
          var data = {
            start : moment( date ).startOf("month").format( 'MMMM DD, YYYY' ),
            end : moment( date ).endOf("month").format( 'MMMM DD, YYYY' )
          }
          appModule.getInvestmentsPerMonth( data )
            .then(function(response){
              // console.log(response);
              scope.investments_arr = response.data.investments;
              angular.forEach( scope.investments_arr ,function( value, key ){ 
                scope.monthly_investments_total += value.value;
              });
            });
        }

        scope.deleteAsset =  ( id ) =>{
          swal({
            title: "Confirm",
            text: "are you sure you want to delete this?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-top"
          }, function(isTrue){
            if(isTrue){
              appModule.removeAssets( id )
                .then(function(response){
                  console.log(response);
                  if( response.data.status == true ){
                    scope.swalShow( response.data.message, 'success' );
                    $('.modal').modal('hide');
                    scope.onLoad();
                  }else{
                    swalShow( response.data.message, 'error' );
                  }
                });
            }
          });
        }

        scope.addAssets =  ( add_data ) =>{
          var data = {
            full_date : moment( scope.selected_date.date ).format( 'YYYY-MM-DD' ),
            day : moment( scope.selected_date.date ).format( 'D' ),
            month : moment( scope.selected_date.date ).format( 'MM' ),
            year : moment( scope.selected_date.date ).format( 'YYYY' ),
            description : add_data.description,
            value : add_data.value,
          }

          appModule.submitAssets( data )
            .then(function(response){
              console.log(response);
              if( response.data.status == true ){
                scope.swalShow( response.data.message, 'success' );
                $('.modal').modal('hide');
                scope.onLoad();
              }else{
                swalShow( response.data.message, 'error' );
              }
            });  
        }

        scope.fetchAssets = ( date ) =>{
          scope.assets_arr = [];
          scope.monthly_income_total = 0;
          var data = {
            start : moment( date ).startOf("month").format( 'MMMM DD, YYYY' ),
            end : moment( date ).endOf("month").format( 'MMMM DD, YYYY' )
          }
          appModule.getAssetsPerMonth( data )
            .then(function(response){
              // console.log(response);
              scope.assets_arr = response.data.income;
              angular.forEach( scope.assets_arr ,function( value, key ){ 
                scope.monthly_income_total += value.value;
              });
            });
        }

        scope.swalShow = ( message, type ) =>{
          if( type == 'success' ){
            swal( 'Success!', message, 'success' );
          }
          if( type == 'error' ){
            swal( 'Error!', message, 'error' );
          }
          if( type == 'warning' ){
            swal( 'Warning!', message, 'warning' );
          }
        }

        scope.showLoading = ( ) =>{
          $( ".main-loader" ).css('display','flex');
        }

        scope.hideLoading = ( ) =>{
          setTimeout(function() {
            $( ".main-loader" ).fadeOut();
          }, 1000);
        }

        scope.onLoad = ( ) =>{
          scope.showLoading();
          scope.fetchAssets( scope.full_date_today );
          scope.fetchInvestments( scope.full_date_today );
          scope.fetchExpenses( scope.full_date_today );
        }

        scope.onLoad();


        $('.modal').on('hidden.bs.modal', function (e) {
          scope.resetValues();
        })

      }
    }


  }
])