// Define SVG area dimensions
var svgWidth =900;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//***********************************************

// Load state data
d3.csv("./data.csv").then(function(stateData) {

  console.log(stateData);

  // log a list of names
  var states = stateData.map(data => data.state);
  console.log("States", states);

  // Cast each hours value in tvData as a number using the unary + operator
  stateData.forEach(function(data) {
    console.log("Age:", data.age);
    console.log("Income:", data.income);
    console.log("Healthcare:", data.healthcare);
    console.log("Poverty:", data.poverty);
  });

});