(function ( $ ) {

    $.fn.lazydatepicker = function( options ) {
        var $this = $(this);

        var week_arr = [];
        var year_range_start = null;
        var year_range_gap = 15;

        var settings = $.extend({
            parentClass: "lazy-date-picker-initialized",
            theme: "default-theme",
            date : moment(),
            format : 'MMMM DD, YYYY',
            weekStartSunday : true,
            showHeader : true
        }, options );

        var date_now = {
            month : moment( settings.date, settings.format ).format('MMM'),
            day : moment( settings.date, settings.format ).format('ddd'),
            date : moment( settings.date, settings.format ).format('D'),
            year : moment( settings.date, settings.format ).format('YYYY'),
            full : moment( settings.date, settings.format ).format( settings.format )
        }

        var pickerElementContainer = null;
        var set_week = "";
        var set_header_visibility = "";
        var isPickerShown = false;

        // ------ EVENT LISTENERS ------ //

        function initializeEventListeners(){
            $("body").find("*").each(function() {

                $(this).off("click");
            });

            $("html").click(function(e){
                if ($(e.target).parents( "."+settings.parentClass ).length === 0) {
                    // resetPicker();
                    hidePicker();
                    showDateSelector();
                    hideMonthSelector();
                    hideYearSelector();
                    addYearRanges( date_now.year );
                }
            });

            $this.click(function(){
                if( isPickerShown == true ){
                  isPickerShown = false;
                  resetPicker();
                }else{
                  isPickerShown = true;
                  togglePicker();
                }
            });

            $( ".month-left-arrow" ).click(function(ev){
                prevMonth();
                setDate();
                addPickerDays();
                setValues();
                initializeEventListeners();
            });

            $( ".month-right-arrow" ).click(function(ev){
                nextMonth();
                setDate();
                addPickerDays();
                setValues();
                initializeEventListeners();
            });

            $( ".lazy-week div" ).click(function(ev){
              if( $( this ).text() != "" ){
                $( ".lazy-week div" ).removeClass( 'active' );
                $( this ).addClass( 'active' );
                setDay( $( this ).text() );
                setValues();
                setInputDateValue();
              }
            });

            $( ".select-month-left-arrow" ).click(function(ev){
              prevYear();
              setDate();
              addPickerDays();
              setValues();
              initializeEventListeners();
            });

            $( ".select-month-right-arrow" ).click(function(ev){
              nextYear();
              setDate();
              addPickerDays();
              setValues();
              initializeEventListeners();
            });

            $( ".lazy-month-row .lazy-month" ).click(function(ev){
              $( ".lazy-month-row .lazy-month" ).removeClass( 'active' );
              $( this ).addClass( 'active' );
              hideMonthSelector();
              showDateSelector();
            });

            $( ".select-year-left-arrow" ).click(function(ev){

              addYearRanges( year_range_start - year_range_gap );
              initializeEventListeners();
            });

            $( ".select-year-right-arrow" ).click(function(ev){

              addYearRanges( year_range_start + year_range_gap );
              initializeEventListeners();
            });

            $( ".lazy-year-row .lazy-year" ).click(function(ev){
              $( ".lazy-year-row .lazy-year" ).removeClass( 'active' );
              $( this ).addClass( 'active' );
              setYear( $( this ).text() );
              hideYearSelector();
              showMonthSelector();
              addPickerDays();
              setValues();
              initializeEventListeners();
            });

            $( ".month-center-selection" ).click(function(ev){
                hideDateSelector();
                showMonthSelector();
            });

            $( ".select-month-center-selection" ).click(function(ev){
                hideMonthSelector();
                showYearSelector();
            });

            $( ".btn-set" ).click(function(ev){
                setInputDateValue();
                resetPicker();
            });

            $( ".btn-cancel" ).click(function(ev){
                
                resetPicker();
            });
        }

        function setWeekNames(){
          if( settings.weekStartSunday == true ){
            week_arr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            set_week =  "<div>Sun</div>" +
                        "<div>Mon</div>" +
                        "<div>Tue</div>" +
                        "<div>Wed</div>" +
                        "<div>Thu</div>" +
                        "<div>Fri</div>" +
                        "<div>Sat</div>";
          }else{
            week_arr = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            set_week = "<div>Mon</div>" +
                        "<div>Tue</div>" +
                        "<div>Wed</div>" +
                        "<div>Thu</div>" +
                        "<div>Fri</div>" +
                        "<div>Sat</div>" +
                        "<div>Sun</div>";
          }
        }

        function setPickerHeader(){
          if( settings.showHeader == false ){
            set_header_visibility = "hide-lazy-picker-header";
          }
        }

        function appendPicker(){
            $this.css('cursor', 'pointer');
            $this.attr('readonly', '');
            $this.after('<div class="datepicker-container">' +
                    '<div class="lazy-datepicker-header' + set_header_visibility + '">' +
                        '<p class="lazy_year_selected">2016</p>' +
                        '<p class="lazy_week_month_day_selected"><span class="lazy_week_day_selected">Fri</span>, <span class="lazy_month_selected">Apr</span> <span class="lazy_day_selected">1</span></p>' +
                    '</div>' +
                    '<div class="lazy-datepicker-container" >' +
                        '<div class="lazy-datepicker-month-year-select">' +
                            '<div class="month-left-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-left"></i>' +
                                '</span>' +
                            '</div>' +
                            '<div class="month-center-selection">' +
                                '<span class="lazy_current_month" style="margin-right: 5px;">April</span> <span class="lazy_current_year">2016</span>' +
                            '</div>' +
                            '<div class="month-right-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-right"></i>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="lazy-calendar-wrapper">' +
                            '<div class="lazy-weeknames">' +
                            set_week +                           
                            '</div>' +
                            '<div class="lazy-weekdates">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="lazy-datepicker-months-container" style="display: none">' +
                      '<div class="lazy-months-header">' +
                        '<div class="select-month-left-arrow lazy-arrow">' +
                            '<span>' +
                                '<i class="fa fa-caret-left"></i>' +
                            '</span>' +
                        '</div>' +
                        '<div class="select-month-center-selection">' +
                            '<span class="lazy_current_year">2016</span>' +
                        '</div>' +
                        '<div class="select-month-right-arrow lazy-arrow">' +
                            '<span>' +
                              '<i class="fa fa-caret-right"></i>' +
                            '</span>' +
                        '</div>' +
                      '</div>' +
                      '<div class="lazy-months-container">' +
                        '<div class="lazy-month-row">' +
                          '<div class="lazy-month">Jan</div>' +
                          '<div class="lazy-month">Feb</div>' +
                          '<div class="lazy-month">Mar</div>' +
                          '<div class="lazy-month">Apr</div>' +
                        '</div>' +
                        '<div class="lazy-month-row">' +
                          '<div class="lazy-month">May</div>' +
                          '<div class="lazy-month">Jun</div>' +
                          '<div class="lazy-month">Jul</div>' +
                          '<div class="lazy-month">Aug</div>' +
                        '</div>' +
                        '<div class="lazy-month-row">' +
                          '<div class="lazy-month">Sep</div>' +
                          '<div class="lazy-month">Oct</div>' +
                          '<div class="lazy-month">Nov</div>' +
                          '<div class="lazy-month">Dec</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="lazy-datepicker-years-container" style="display: none">' +
                      '<div class="lazy-years-header">' +
                        '<div class="select-year-left-arrow lazy-arrow">' +
                            '<span>' +
                                '<i class="fa fa-caret-left"></i>' +
                            '</span>' +
                        '</div>  ' +
                        '<div class="select-year-center-selection">' +
                            '<span class="lazy_current_year_range">2016 - 2030</span>' +
                        '</div>' +
                        '<div class="select-year-right-arrow lazy-arrow">' +
                            '<span>' +
                                '<i class="fa fa-caret-right"></i>' +
                            '</span>' +
                        '</div>  ' +
                      '</div>' +
                      '<div class="lazy-years-container"></div>' +
                    '</div>' +
                    '<div class="btn-container">' +
                        '<button class="btn-cancel">Cancel</button>' +
                        '<button class="btn-set">Set</button>' +
                    '</div>' +
                '</div>');
        }

        function addPickerDays(){
          var dateNow = moment( date_now.full );
          var pickerEl = $( pickerElementContainer ).find( ".lazy-weekdates" );
          var daysInMonth = dateNow.daysInMonth();
          var firstDayInMonth = dateNow.startOf( 'month' ).format( 'd' );
          var temp_ctr = 0;
          var week_ctr = 0;
          var day_count = 1;
          var temp_append = "";
          var monthStartDay = ( settings.weekStartSunday == true ) ? firstDayInMonth : firstDayInMonth-1;

          pickerEl.html("");

          while( temp_ctr != daysInMonth ){
            temp_ctr++;

            var dayname = moment( dateNow ).format( "ddd" );
            if( week_ctr == 0 ){
              temp_append += '<div class="lazy-week">';

              if( temp_ctr == 1 ){
                for( var i = 0; i < monthStartDay; i++ ){
                  temp_append += '<div style="cursor: default;"></div>';
                  week_ctr++;
                }
              }
            }

            for( var i = 0; i < week_arr.length; i++ ){
              if( dayname == week_arr[ i ] ){
                if( date_now.date == day_count ){
                  temp_append += '<div class="active"><span>' + day_count + '</span></div>';
                }else{
                  temp_append += '<div><span>' + day_count + '</span></div>';
                }
                day_count++;
                week_ctr++;
              }
            }

            if( week_ctr == 7 || temp_ctr == daysInMonth ){
              if( temp_ctr == daysInMonth ){
                for( var i = 0; i < (7 - week_ctr); i++ ){
                  temp_append += '<div style="cursor: default;"></div>';
                }
              }

              temp_append += '</div>';
              pickerEl.append( temp_append );
              temp_append = "";
              week_ctr = 0;
            }
          }
        }

        function addYearRanges( year ){
          year_range_start = null;

          var pickerEl = $( pickerElementContainer ).find( ".lazy-years-container" );
          var current_year = parseInt( year );
          var rem = year % 100;
          var row_ctr = 1;
          var temp_append = "";

          year_range_gap = 15;
          year_range_start = ( current_year - rem ) + ( year_range_gap * ( parseInt( rem / year_range_gap ) ) );

          var end_year = year_range_start + year_range_gap;
          var years = year_range_start;

          pickerEl.html("");
          $( pickerElementContainer ).find( ".lazy_current_year_range" ).text( (year_range_start+1) + " - " + end_year );

          while( years < end_year ){
            years++;

            if( row_ctr == 1 ){
              temp_append += '<div class="lazy-year-row">';
            }

            if( years == date_now.year ){
              temp_append += '<div class="lazy-year active">' + years + '</div>';
            }else{
              temp_append += '<div class="lazy-year">' + years + '</div>';
            }

            row_ctr++;

            if( row_ctr == 6 ){
              temp_append += '</div>';
              pickerEl.append( temp_append );
              temp_append = "";
              row_ctr = 1;
            }
          }
        }

        function setPickerParent(){
            
            $this.parent().addClass( settings.parentClass );
        }

        function setPickerContainer(){
            
            pickerElementContainer = $this.closest( "."+settings.parentClass ).find(".datepicker-container");
        }

        function setPickerTheme(){
            if( settings.theme == 'dark-theme' || settings.theme == 'default-theme' ){
                $( pickerElementContainer ).addClass( settings.theme );
            }
        }

        function setPickerWidth(){
            
            $( pickerElementContainer ).css( 'width', $this.outerWidth() );
        }

        function nextYear(){

          date_now.full = moment( date_now.full ).add( 1, 'year').format( settings.format );
        }

        function prevYear(){

          date_now.full = moment( date_now.full ).subtract( 1, 'year').format( settings.format );
        }

        function nextMonth(){

          date_now.full = moment( date_now.full ).add( 1, 'month').format( settings.format );
        }

        function prevMonth(){

          date_now.full = moment( date_now.full ).subtract( 1, 'month').format( settings.format );
        }

        function setDate(){
          date_now.month = moment( date_now.full ).format( 'MMM' );
          date_now.day = moment( date_now.full ).format( 'ddd' );
          date_now.date = moment( date_now.full ).format( 'D' );
          date_now.year = moment( date_now.full ).format( 'YYYY' );
        }

        function setDay( day ){
          date_now = {
              month : moment( date_now.month + " " + day + ", " + date_now.year, "MMM D, YYYY" ).format( 'MMM' ),
              day : moment( date_now.month + " " + day + ", " + date_now.year, "MMM D, YYYY" ).format('ddd'),
              date : moment( date_now.month + " " + day + ", " + date_now.year, "MMM D, YYYY" ).format('D'),
              year : moment( date_now.month + " " + day + ", " + date_now.year, "MMM D, YYYY" ).format('YYYY'),
              full : moment( date_now.month + " " + day + ", " + date_now.year, "MMM D, YYYY" ).format( settings.format )
          }
        }

        function setYear( year ){
          date_now = {
              month : moment( date_now.month + " " + date_now.day + ", " + year, "MMM D, YYYY" ).format( 'MMM' ),
              day : moment( date_now.month + " " + date_now.day + ", " + year, "MMM D, YYYY" ).format('ddd'),
              date : moment( date_now.month + " " + date_now.day + ", " + year, "MMM D, YYYY" ).format('D'),
              year : moment( date_now.month + " " + date_now.day + ", " + year, "MMM D, YYYY" ).format('YYYY'),
              full : moment( date_now.month + " " + date_now.day + ", " + year, "MMM D, YYYY" ).format( settings.format )
          }
        }

        function setValues(){
          if( date_now.full == 'Invalid date' ){
            console.log( "Error : Invalid date." );
          }else{
            $( pickerElementContainer ).find(".lazy-datepicker-header .lazy_year_selected").text( date_now.year );
            $( pickerElementContainer ).find(".lazy-datepicker-header .lazy_month_selected").text( date_now.month );
            $( pickerElementContainer ).find(".lazy-datepicker-header .lazy_week_day_selected").text( date_now.day );
            $( pickerElementContainer ).find(".lazy-datepicker-header .lazy_day_selected").text( date_now.date );

            $( pickerElementContainer ).find(".lazy-datepicker-container .month-center-selection .lazy_current_month").text( date_now.month );
            $( pickerElementContainer ).find(".lazy-datepicker-container .month-center-selection .lazy_current_year").text( date_now.year );

            $( pickerElementContainer ).find(".lazy-datepicker-months-container .select-month-center-selection .lazy_current_year").text( date_now.year );
          }          
        }

        function setInputDateValue(){
          
          $this.val( date_now.full );
        }

        function resetPicker(){
          hidePicker();
          showDateSelector();
          hideMonthSelector();
          hideYearSelector();
          addYearRanges( date_now.year );
          initializeEventListeners();
        }

      // TOGGLES

        function togglePicker(){
            
            $( pickerElementContainer ).toggle();
        }

        function hidePicker(){
            $( pickerElementContainer ).hide();
            isPickerShown = false;
        }

        function showDateSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-container").show();
        }

        function hideDateSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-container").hide();
        }

        function showMonthSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-months-container").show();
        }

        function hideMonthSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-months-container").hide();
        }

        function showYearSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-years-container").show();
        }

        function hideYearSelector(){

            $( pickerElementContainer ).find(".lazy-datepicker-years-container").hide();
        }

      // 

        // ONLOAD 
        function onLoad(){
          setWeekNames();
          setPickerHeader();
          appendPicker();
          setPickerParent();
          setPickerContainer();
          setPickerTheme();
          addPickerDays();
          addYearRanges( date_now.year );
          setPickerWidth();
          setValues();
          initializeEventListeners();
        }

        onLoad();

    };
 
}( jQuery ));