
//For the header's hamburger menu on click events
$(document).ready(function () {
			  $(".navbar-toggle").on("click", function () {
				    $(this).toggleClass("active");
			  });

		    $('.nav a').on('click', function(){ 
		        if($('.navbar-toggle').css('display') !='none'){
		            $(".navbar-toggle").trigger( "click" );
		        }
		    });


});