$(document).ready(function() {

$document = $(document);
var fixedNav = $("nav").clone().insertAfter('nav');
fixedNav.addClass('sticky nobg').hide().removeClass('right ').find('li').removeClass('slide');
fixedNav.find('[href="#touch"]').html('<p>Get in touch</p>');
$('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
       $('html, body').stop();
       // fixedNav.stop();
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
	$('html, body').stop().animate({scrollTop:position - $('nav.sticky').outerHeight()}, Math.abs($document.scrollTop()-position), 'easeInOutQuad', navScroll);
	});


// Bar graph skill with 3djs
// Data
var data = [
	{name:'PHP', value:100},
	{name:'ASP/PERL', value:80},
	{name:'SEO', value:70},
	{name:'HTML/CSS', value:90},
	{name:'PHOTHOSOP', value:60},
	{name:'RUBY ON RAILS', value:80},
	{name:'WORDPRESS', value:50},
	];

// Graph
var margin = {top:40, right: 20, bottom:30, left:40},
width = 500 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

var x = d3.scaleBand().
	domain(data.map(function(d){
		return d.name;
	}))
	.rangeRound([0, width]).paddingInner(0.2).paddingOuter(0.1).align(1);

var y = d3.scaleLinear().
	domain([0, 100])
	.range([0, height]);

var xAxis = d3.axisBottom(x).tickSizeOuter(0);
var yAxis = d3.axisLeft(y).tickSize(0).tickValues('');

var svg = d3.select("#svg").append("svg")
	.attr("viewBox", "0 0 500 300")
	.attr("preserveAspectRatio", "xMidYMid");
var g = svg.append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")");




  g.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  g.selectAll("bar")
      .data(data)
    .enter().append("rect")

      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return height ;});

 g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height)+ ")")
      // .attr("height", height + margin.top + margin.bottom)
      .call(xAxis)
    .selectAll("text")
      .attr("class", 'barLabels')
      .style("text-anchor", "start")
      .style('font-size', '0')
      .style('font-family', 'Ubuntu')
      .style('font-weight', 'bold')
      .attr("dx", "0.2em")
      .attr("dy", ".0em")
      .attr("transform", "rotate(-90) translate(10, 3)" );


 g.append("text")
 	.attr("x", 0)
 	.attr("y", 0)
 	// .attr("text-anchor", "middle")
 	.style("font-size", "1rem")
 	.style("text-transform", "uppercase")
 	.text("Technical Skills")
 	.attr("transform", 'translate(' + 0 +  ',' + '-10' +')');

function animateBar(g) {
	g.selectAll('rect')
	.transition().delay(function (d,i){ return i * 600 + 600;})
 	.duration(800)
 	.attr("y", function(d) { return height - y(d.value);})
 	.attr("height", function(d) { return  y(d.value); });

 	a = svg.selectAll('.barLabels')
 	.transition().delay(function (d,i){ return i * 500 + 500;})
 	.duration(1800)
 	.style('font-size', '0.8rem');

}

function once(fn, g){

		return function inner(){
			fn.bind(null, g)();
			fn=function(){return null;};
		};


}
(function() {
	var aSkills = $('[href="#skills"]');
	if (aSkills.css('display') === 'none'){
		$('[href="#touch"]').click(once(animateBar, g));
	} else {
		$('[href="#skills"]').click(once(animateBar, g));

	}
})();

});