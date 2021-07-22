var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
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

    // // log a list of state names
    // var states = stateData.map(data => data.state);
    // console.log("States", states);
    
    // // View some selected data on the console
    // // ======================================
    // stateData.forEach(function(data) {
    //   console.log("Age:", data.age);
    //   console.log("Income:", data.income);
    //   console.log("Healthcare:", data.healthcare);
    //   console.log("Poverty:", data.poverty);
    // });

    // Parse Data/Cast as numbers
    // ==============================
    // hairData.forEach(function(data) {
    //   data.poverty = +data.poverty;
    //   data.healthcare = +healthcare;
    // });

      // Create scale functions
      // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, 23]) // .domain([8, d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, 26]) // .domain([3, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);

    // Create axes functions
    // ==============================
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    // Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5")

    // Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty (%): ${d.poverty}<br>No Healthcare (%): ${d.healthcare}`);
      });

    // Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
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
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty Rate (%)");
  }).catch(function(error) {
    console.log(error);
  });