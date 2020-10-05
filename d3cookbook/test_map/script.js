var width = 950;
var height = 590;
var labelSize = 30;
    
 var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);
    
var projection = d3.geoFahey()
      .scale(width / 4 / Math.PI)
      .translate([width / 4, height / 4])

var path = d3.geoPath().projection(projection);
var center = { x: (width / 2), y: (height / 2)};
    
d3.json("world.json")
  .then(function(world) {

      world = topojson.presimplify(world);
         
      renderMap(svg.append("g"), 
             0.001, "yellow");
      renderMap(svg.append("g").attr("transform", "translate(" +  center.x + ",0)"),
             5, "gold");
      renderMap(svg.append("g").attr("transform", "translate(0," + center.y + ")"),
             10, "orange");
      renderMap(svg.append("g").attr("transform", "translate(" + center.x + ","+ center.y +")"),
             50, "tomato");

      function renderMap(container, minWeight, color) {
            var geo = topojson.simplify(world, minWeight);
            var countries = topojson.feature(geo, world.objects.countries).features;
            container
				.append("g")
                .selectAll("path", ".country")
                .data(countries).enter()
                .append("path")
                  .attr("class", "country")
                  .attr("d", path)
                  .style("fill", color);
			
				
			container
				.append("rect")
				.attr("height", labelSize)
				.attr("y", (center.y - 	labelSize) / 2) 
				.attr("width", center.x)
				
			container
				.append("text")
				.text("minWeight = " + minWeight)
				.attr("transform", "translate(" + (center.x / 2) + "," + (center.y / 2) + ")");
          } 
});