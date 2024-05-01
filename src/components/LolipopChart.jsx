import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LollipopChart = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Clear SVG before redrawing
      svg.selectAll("*").remove();

      // Dimensions and margins of the graph
      const margin = { top: 30, right: 30, bottom: 40, left: 75 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

      const chart = svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Tooltip setup
      const tooltip = d3.select("body").append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "10px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "4px")
        .style("color", "#fff")
        .text("a simple tooltip");

      // Add X axis
      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([ 0, width]);
      chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Y axis
      const y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(d => d.name))
        .padding(1);
      chart.append("g")
        .call(d3.axisLeft(y))

      // Lines
      chart.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", d => x(d.value))
        .attr("x2", x(0))
        .attr("y1", d => y(d.name))
        .attr("y2", d => y(d.name))
        .attr("stroke", "grey")

      // Circles
      chart.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.value))
        .attr("cy", d => y(d.name))
        .attr("r", "7")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")
        .on("mouseover", function(event, d) {
          tooltip.text(`Word: ${d.name}, Frequency: ${d.value}`);
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(event) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left",(event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
          tooltip.style("visibility", "hidden");
        });
    }
  }, [data]); // Redraw chart if data changes

  return (
    <svg
      className="d3-component"
      width={460}
      height={400}
      ref={d3Container}
    />
  );
};

export default LollipopChart;
