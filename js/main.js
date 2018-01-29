$(document).ready(function() {
	if( $(this).scrollTop() >= $('#content-one').position().top - 50 && $(this).scrollTop() < $('#content-two').position().top - 50 ){
    $("#main-navigation .navbar-right li").removeClass('active');
		$("#main-navigation .navbar-right li:nth-child(1)").addClass('active');
  }else if( $(this).scrollTop() >= $('#content-two').position().top - 50 && $(this).scrollTop() < $('#content-three').position().top - 50 ){
    $("#main-navigation .navbar-right li").removeClass('active');
		$("#main-navigation .navbar-right li:nth-child(2)").addClass('active');
  }else if( $(this).scrollTop() >= $('#content-three').position().top - 50 && $(this).scrollTop() < $('#content-four').position().top - 50){
    $("#main-navigation .navbar-right li").removeClass('active');
		$("#main-navigation .navbar-right li:nth-child(3)").addClass('active');
  }else if( $(this).scrollTop() >= $('#content-four').position().top - 50 ){
    $("#main-navigation .navbar-right li").removeClass('active');
		$("#main-navigation .navbar-right li:nth-child(4)").addClass('active');
  } 

  if( $(this).scrollTop() >= $('footer').position().top - 500 ){
  	$('#backTop-container').show();	  
  }else{
  	$('#backTop-container').hide();
  } 

	$(document).on('scroll', function() {

    if( $(this).scrollTop() >= $('#content-one').position().top - 50 && $(this).scrollTop() < $('#content-two').position().top - 50 ){
	    $("#main-navigation .navbar-right li").removeClass('active');
			$("#main-navigation .navbar-right li:nth-child(1)").addClass('active');
	  }else if( $(this).scrollTop() >= $('#content-two').position().top - 50 && $(this).scrollTop() < $('#content-three').position().top - 50 ){
	    $("#main-navigation .navbar-right li").removeClass('active');
			$("#main-navigation .navbar-right li:nth-child(2)").addClass('active');
	  }else if( $(this).scrollTop() >= $('#content-three').position().top - 50 && $(this).scrollTop() < $('#content-four').position().top - 50 ){
	    $("#main-navigation .navbar-right li").removeClass('active');
			$("#main-navigation .navbar-right li:nth-child(3)").addClass('active');
	  }else if( $(this).scrollTop() >= $('#content-four').position().top - 50 ){
	    $("#main-navigation .navbar-right li").removeClass('active');
			$("#main-navigation .navbar-right li:nth-child(4)").addClass('active');
	  }

	  if( $(this).scrollTop() >= $('footer').position().top - 500 ){
	  	$('#backTop-container').show();	  
	  }else{
	  	$('#backTop-container').hide();
	  }
	});
  

  $(document).on('click', 'a[href^="#"]', function(e) {
	  // target element id
	  var id = $(this).attr('href');

	  // target element
	  var $id = $(id);
	  if ($id.length === 0) {
	      return;
	  }

	  // prevent standard hash navigation (avoid blinking in IE)
	  e.preventDefault();

	  // top position relative to the document
	  var pos = $id.offset().top;

	  // animated top scrolling
	  $('body, html').animate({scrollTop: pos});
	});
});