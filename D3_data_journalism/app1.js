// // Define SVG area dimensions
// var svgWidth =900;
// var svgHeight = 700;

// // Define the chart's margins as an object
// var chartMargin = {
//   top: 30,
//   right: 50,
//   bottom: 30,
//   left: 50
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// // to the margins set in the "chartMargin" object.
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// //***********************************************

// // Load state data
// d3.csv("./data.csv").then(function(stateData) {

//   console.log(stateData);

//   // log a list of names
//   var states = stateData.map(data => data.state);
//   console.log("States", states);

//   // Cast each hours value in stateData as a number using the unary + operator
//   stateData.forEach(function(data) {
//     console.log("Age:", data.age);
//     console.log("Income:", data.income);
//     console.log("Healthcare:", data.healthcare);
//     console.log("Poverty:", data.poverty);
//   });

//   // Add x-axis
//   var x = d3.scaleLinear()
//     .domain([0, d3.max(age)])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add y-axis
//   var y = d3.scaleLinear()
//     .domain([0, d3.max(healthcare)])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) { return x(d.age); } )
//     .attr("cy", function (d) { return y(d.healthcare); } )
//     .attr("r", 1.5)
//     .style("fill", "#69b3a2")
// });


var svgWidth = 900;
var svgHeight = 600;

var margin = {
  top: 40,
  right: 50,
  bottom: 40,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load state data
d3.csv("./data.csv").then(function(stateData) {
  console.log(stateData);

  // log a list of names
  var states = stateData.map(data => data.state);
  console.log("States", states);

  // Step 1. Cast each hours value in stateData as a number using the unary + operator
  // =================================================================================
  stateData.forEach(function(data) {
    console.log("Age:", data.age);
    // console.log("Income:", data.income);
    console.log("Healthcare:", data.healthcare);
    // console.log("Poverty:", data.poverty);
  });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([25, d3.max(stateData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Age: ${d.age}<br>Healthcare: ${d.healthcare}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age vs. Healthcare by State");
  }).catch(function(error) {
    console.log(error);
  });
