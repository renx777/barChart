
d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(x) {
    var rawData = x.data;
  
    var gdpData = [];
    var yearData = [];
    var data = [];
    var margin = { top: 40, right: 20, bottom: 30, left: 80 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      
  
  
  
    for (var i = 0; i < rawData.length; i++) {
      gdpData.push(rawData[i][1]);
      yearData.push(rawData[i][0]);

      var x = [];
      x.push(rawData[i][0]);
      x.push(rawData[i][1]);
      data.push(x);
    }
console.log(data)

    //values which should be labeled on x-axis
    var years = [
      0,
      1950,
      1955,
      1960,
      1965,
      1970,
      1975,
      1980,
      1985,
      1990,
      1995,
      2000,
      2005,
      2010,
      2015
    ];

    var svg =d3.select("#gdp").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  
    

    var minDate=new Date(data[0][0])
    var maxDate=new Date(data[274][0])
  
    
    
    var xscale = d3
    .scaleTime()
    .domain([minDate,maxDate])
    .range([0, width]);

    
    
    var x_axis = d3
    .axisBottom()
    .scale(xscale)
    .ticks(10);
//    label for x axis 
  
    
    var yscale=d3
    .scaleLinear()
    .range([height,0])
.domain([0,d3.max(gdpData)]);
   
    var y_axis = d3
    .axisLeft()
    .scale(yscale)
    .ticks(15);

//     label for y axis
   svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Gross Domestic Product USA");  
    
     var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left+500 + "," + margin.top+100 + ")");
    
    svg
      .append("g")
      .attr('class','x axis')
    .call(x_axis)
    .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("transform", "rotate(-90)")
    
     
      
     
    svg
      .append("g")
      .attr("class", "y axis")
      .call(y_axis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency")
    ;
    var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    // tooltip mouseover event handler
    var tipMouseover = function(data) {
     
      //var color = colorScale(d.manufacturer);
      var color = "black";
      var html =
        "<span>" +  data[0] +"</span><br/>" +
           
         "<span><strong>$ " +  data[1] +"billion</strong></span>"
          ;

      tooltip
        .html(html)
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", 0.9); // started as 0!
    };
    // tooltip mouseout event handler
    var tipMouseout = function(data) {
     
      tooltip
        .transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
    };

    
    
    
    
    svg.append('g').selectAll(".bar")
     .attr("transform", "rotate(-90)")
     .attr("transform", "translate(50, 00)")
         .data(data)
         .enter()
        .append("rect")
         .attr("class", "bar")
     
         .attr("x", function(d) { return xscale(new Date(d[0])) }) 
         .attr("y", function(d) { return yscale(d[1]) })  
    .attr('stroke', '#2378ae')
    .attr("width", 4)
         .attr("height", function(d) { return height-yscale(d[1]) } )
     .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout)
       .transition().duration(500)
.delay( function(d,i) { return i * 10; })
         
    
    })