
// // Create svg element
// var svgWidth = 1200;
// var svgHeight = 900;

// var margin = {
//     top: 50,
//     right: 50,
//     bottom: 50,
//     left: 50
// };

// var svg = d3.select("body")
// .append("svg")
// .attr("width", svgWidth)
// .attr("height", svgHeight)

// Loading the cvs data and binding it to the DOM
d3.csv("/data/data.csv", function(data) {
    console.log(data);
});
