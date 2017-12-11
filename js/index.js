$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(x) {
    var rawData = x.data;
    var gdpData = [];
  var yearData=[]
  var data=[]
 var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
      
  
  
  
    for (var i = 0; i < rawData.length; i++) {
      
      gdpData.push(rawData[i][1]);
      yearData.push(rawData[i][0]);
      
      var x=[]
      x.push(rawData[i][0]);
      x.push(rawData[i][1]);
      data.push(x)
     
      
    }

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
    var svg =d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var minDate=new Date(data[0][0])
    var maxDate=new Date(data[274][0])
    console.log(minDate)
    var xscale = d3
    .scaleTime()
    .domain([minDate,maxDate])
    .range([0, width]);

    var x_axis = d3
    .axisBottom()
    .scale(xscale)
    .ticks(10)
    
    var yscale=d3
    .scaleLinear()
    .range([height,0])
.domain([0,d3.max(gdpData)]);
   
    var y_axis=d3
               .axisLeft()
               .scale(yscale)
                .ticks(15);
    console.log(data[data.length-1][0])
    
     var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left+500 + "," + margin.top+100 + ")");
    
    svg
      .append("g")
      .attr('class','x-axis')
    .attr("transform", "translate(0," + height + ")")
      .call(x_axis)
      
     
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

    
    svg.append('g').selectAll(".bar")
     .attr("transform", "rotate(-90)")
     .attr("transform", "translate(50, 00)")
         .data(data)
         .enter()
        .append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xscale(new Date(d[0])) }) 
         .attr("y", function(d) {console.log(d[1]); return yscale(d[1]) })  //
       .transition().duration(500)
.delay( function(d,i) { return i * 10; })
         .attr("width", 4)
         .attr("height", function(d) { return height-yscale(d[1]) } );
    
    });