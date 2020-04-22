import React from "react";
import * as d3 from "d3";
import {
  prepareLineData,
  calculateInitScale,
  recalculateScale,
} from "./d3-utils";

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const xScale = d3.scaleLinear().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

console.log(d3.scaleLinear().range([0, width]));
const Plot = ({ points, STD }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const path = d3.select("#normal_curve");

    if (path.empty()) {
      const { x, y } = calculateInitScale(points, STD, { xScale, yScale });

      const svg = d3
        .select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x));
      svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

      svg
        .append("g")
        .append("path")
        .datum(points)
        .attr("id", "normal_curve")
        .attr("d", prepareLineData(x, y))
        .style("fill", "#00A868")
        .style("opacity", "0.5");
    } else {
      const { x, y } = recalculateScale(
        points,
        STD,
        { xScale, yScale },
        { width, height }
      );

      d3.select(".x").transition().call(d3.axisBottom(x));
      d3.select(".y").transition().call(d3.axisLeft(y));

      path.datum(points).transition().attr("d", prepareLineData(x, y));
    }
  }, [points]);

  return <svg ref={ref} />;
};

export default Plot;
