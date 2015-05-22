(function($){
	$('#current-demo-name').html(window.demo.title);
	$('#current-demo-description').html(window.demo.description);

	// compile field definitions
	if(window.demo.customization && window.demo.customization.length){
		var detailOut = "";
		for (var i = 0; i < window.demo.customization.length; i++) {
			detailOut = detailOut + '<span class="detail-span">' + window.demo.customization[i].slug + '</span>' + window.demo.customization[i].detail + '<br/>';
		};
		$('#current-demo-detail').html(detailOut).show();
	}

	var btnName = "";
	if(window.user.lastname){
		btnName = window.user.firstname + ' ' + window.user.lastname.charAt(0) + '.';
	}else{
		btnName = window.user.firstname;
	}
	$('#current-user-name').html(btnName);

	window.reveal = function(method){		// $.each($('[data-liotrigger]'), function( index, value ) {
		var elementObj = window.lio.peppedElements;
      	for (var key in elementObj) {
      		for (var ci = 0, cl = elementObj[key].length; ci < cl; ci++) {
			  if( method == "add" ){
			  	$(elementObj[key][ci].elem).addClass('reveal-element');
			  }else{
			  	$(elementObj[key][ci].elem).removeClass('reveal-element');
			  }
			}
		}
	}

	$( '#reveal-elements' ).hover(
		function() {
			window.reveal('add');
		}, function() {
			window.reveal('remove');
		}
	);

	$( '[data-newuser]' ).click(function() {
		var key = $(this).attr('data-newuser');
		saveDataToStorage('userName', key);

		if(window.location.pathname.includes("personalization-redirect_")){
			key = getDataFromStorage('demoName');
			window.location.href = "/examples/" + key + ".html";
		}else{
			location.reload();
		}
	});

	$( '[data-newdemo]' ).click(function() {
		var key = $(this).attr('data-newdemo');
		saveDataToStorage('demoName', key);
		window.location.href = "/examples/" + key + ".html";
	});
})(jQuery); // end of jQuery name space