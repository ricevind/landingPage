$(document).ready(function() {

$document = $(document);
var fixedNav = $("nav").clone().insertAfter('nav');
fixedNav.addClass('sticky nobg').hide().removeClass('right ').find('li').removeClass('slide');
fixedNav.find('[href="#touch"]').html('<p>Get in touch</p>');
$('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       $('html, body').stop();
       fixedNav.stop();
   }, navScroll);

	function navScroll() {
		var nav = $("nav");
		var navHeight = nav.outerHeight(true);
		var mainHeader = $('#mainHeader');
		var navPosition = mainHeader.outerHeight(true) + navHeight;
		var slideOptions = {duration:400, easing:'swing'};

		if ($document.scrollTop() > navPosition ) {
			fixedNav.slideDown(slideOptions);
		}
		else if ($document.scrollTop() < mainHeader.outerHeight(true) + navHeight){
			fixedNav.slideUp(slideOptions);
		}
	}
	// $document.on("scroll", navScroll);
	navScroll();
//
function elemPosition(selector){
	return $(selector).position().top;
	}
$('a').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href');
	$('a').removeClass('active');
	$("[href='"+id+"']").addClass('active');
	var position = elemPosition(id);
	$('html, body').stop().animate({scrollTop:position - $('nav.sticky').outerHeight()}, Math.abs($document.scrollTop()-position), 'easeInOutQuad',navScroll);
	});
});