(function ( $ ) {

    $.fn.lazytimepicker = function( options ) {
        var $this = $(this);

        var format = 'hh:mm a';

        var settings = $.extend({
            parentClass: "lazy-time-picker-initialized",
            theme: "default-theme",
            time: moment(),
            position: "bottom"
        }, options );

        var time_now = {
            hour : parseInt( moment( settings.time, format ).format('hh') ),
            minute : parseInt( moment( settings.time, format ).format('mm') ),
            daytime : moment( settings.time, format ).format('a'),
            full : moment( settings.time, format ).format( format )
        }

        var pickerElementContainer = null;

        // ------ EVENT LISTENERS ------ //

        function initializeEventListeners(){
            $("html").click(function(e){
                if ($(e.target).parents( "."+settings.parentClass ).length === 0) {
                    hidePicker();
                }
            });

            $this.click(function(){
                togglePicker();
            });

            $( ".hour-up-arrow" ).click(function(ev){
                addHour();
                setValues();
            });

            $( ".hour-down-arrow" ).click(function(ev){
                deductHour();
                setValues();
            });

            $( ".minute-up-arrow" ).click(function(ev){
                addMinute();
                setValues();
            });

            $( ".minute-down-arrow" ).click(function(ev){
                deductMinute();
                setValues();
            });

            $( ".daytime-up-arrow" ).click(function(ev){
                toggleDaytime();
                setValues();
            });

            $( ".daytime-down-arrow" ).click(function(ev){
                toggleDaytime();
                setValues();
            });

            $( ".btn-set" ).click(function(ev){
                setTime();
            });

            $( ".btn-cancel" ).click(function(ev){
                hidePicker();
            });
        }

        function appendPicker(){
            $this.css('cursor', 'pointer');
            $this.attr('readonly', '');
            $this.after(
                '<div class="timepicker-container">' +
                    '<div class="lazy-timepicker-container">' +
                        '<div class="hour-box">' +
                            '<div class="hour-up-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-up"></i>' +
                                '</span>' +
                            '</div>' +
                            '<div class="hour-value lazy-value">' +
                                '<span>00</span>' +
                            '</div>' +
                            '<div class="hour-down-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-down"></i>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="middle-box">' +
                            '<span>:</span>' +
                        '</div>' +
                        '<div class="minute-box">' +
                            '<div class="minute-up-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-up"></i>' +
                                '</span>' +
                            '</div>' +
                            '<div class="minute-value lazy-value">' +
                                '<span>01</span>' +
                            '</div>' +
                            '<div class="minute-down-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-down"></i>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="middle-box">' +
                        '</div>' +
                        '<div class="daytime-box">' +
                            '<div class="daytime-up-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-up"></i>' +
                                '</span>' +
                            '</div>' +
                            '<div class="daytime-value lazy-value">' +
                                '<span>AM</span>' +
                            '</div>' +
                            '<div class="daytime-down-arrow lazy-arrow">' +
                                '<span>' +
                                    '<i class="fa fa-caret-down"></i>' +
                                '</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="btn-container">' +
                        '<button class="btn-cancel">Cancel</button>' +
                        '<button class="btn-set">Set</button>' +
                    '</div>' +
                '</div>'
            );
        }

        function setPickerParent(){
            
            $this.parent().addClass( settings.parentClass );
        }

        function setPickerContainer(){
            
            pickerElementContainer = $this.closest( "."+settings.parentClass ).find(".timepicker-container");
        }

        function setPickerTheme(){
            if( settings.theme == 'dark-theme' || settings.theme == 'default-theme' ){
                $( pickerElementContainer ).addClass( settings.theme );
            }
        }

        function setPickerPosition(){
            $this.closest( "."+settings.parentClass ).css({
                position : 'relative'
            });

            if( settings.position == 'bottom' ){
                $( pickerElementContainer ).css({
                    top : $this.outerHeight()
                });
            }else{
                $( pickerElementContainer ).css({
                    bottom : $this.outerHeight()
                });
            }
        }

        function setPickerWidth(){
            
            $( pickerElementContainer ).css( 'width', $this.outerWidth() );
        }

        function togglePicker(){
            
            $( pickerElementContainer ).toggle();
        }

        function hidePicker(){

            $( pickerElementContainer ).hide();
        }

        function addHour(){
            if( time_now.hour == 12 ){ 
                time_now.hour = 1;
            }else{
                time_now.hour++;
            }
        }

        function deductHour(){
            if( time_now.hour == 1 ){ 
                time_now.hour = 12;
            }else{
                time_now.hour--;
            }
        }

        function addMinute(){
            if( time_now.minute == 59 ){ 
                time_now.minute = 0;
            }else{
                time_now.minute++;
            }
        }

        function deductMinute(){
            if( time_now.minute == 0 ){ 
                time_now.minute = 59;
            }else{
                time_now.minute--;
            }
        }

        function toggleDaytime(){
            if( time_now.daytime == 'am' ){
                time_now.daytime = 'pm';
            }else{
                time_now.daytime = 'am';
            }
        }

        function setValues(){
            var hour = ( time_now.hour < 10 ) ? "0" + time_now.hour : time_now.hour;        
            var minute = ( time_now.minute < 10 ) ? "0" + time_now.minute : time_now.minute;    
            var daytime = time_now.daytime.toUpperCase();

            if( time_now.full == 'Invalid date' ){
                console.log( "Error : Invalid time." );
            }else{
                $( pickerElementContainer ).find(".hour-value span").text( hour );
                $( pickerElementContainer ).find(".minute-value span").text( minute );
                $( pickerElementContainer ).find(".daytime-value span").text( daytime );
            }
        }

        function setTime(){
            var hour = ( time_now.hour < 10 ) ? "0" + time_now.hour : time_now.hour;        
            var minute = ( time_now.minute < 10 ) ? "0" + time_now.minute : time_now.minute;    
            var daytime = time_now.daytime.toUpperCase()    

            $( pickerElementContainer ).find(".hour-value span").text( hour );
            $( pickerElementContainer ).find(".minute-value span").text( minute );
            $( pickerElementContainer ).find(".daytime-value span").text( daytime );

            time_now.full = hour + ":" + minute + " " + time_now.daytime;

            $this.val(time_now.full);
            hidePicker();
        }

        // ONLOAD 
        function onLoad(){
            appendPicker();
            setPickerParent();
            setPickerContainer();
            setPickerPosition();
            setPickerTheme();
            setPickerWidth();
            setValues();
            initializeEventListeners();
        }

        onLoad();

    };
 
}( jQuery ));