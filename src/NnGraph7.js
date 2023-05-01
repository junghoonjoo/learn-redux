import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { event } from "d3-selection";

const NnGraph7 = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 500;
    const margin = 50;
    const nodeRadius = 20;

    const data = {
      layers: [
        { nodes: 10, activation: "sigmoid" },
        { nodes: 5, activation: "tanh" },
        { nodes: 3, activation: "relu" }
      ]
    };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const layerCount = data.layers.length;
    const layerWidth = (width - margin * 2) / layerCount;

    // create nodes
    const nodes = [];
    for (let i = 0; i < layerCount; i++) {
      for (let j = 0; j < data.layers[i].nodes; j++) {
        nodes.push({
          layer: i,
          id: `${i}-${j}`,
          activation: data.layers[i].activation
        });
      }
    }

    // create links
    const links = [];
    for (let i = 0; i < layerCount - 1; i++) {
      for (let j = 0; j < data.layers[i].nodes; j++) {
        for (let k = 0; k < data.layers[i + 1].nodes; k++) {
          links.push({
            source: `${i}-${j}`,
            target: `${i + 1}-${k}`
          });
        }
      }
    }

    // create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(d => margin + d.layer * layerWidth))
      .force("y", d3.forceY(height / 2))
      .force("link", d3.forceLink(links).distance(100));

    // create links
    const link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke", "#ccc");

    // create nodes
    const node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(drag(simulation));

    node.append("circle")
      .attr("r", nodeRadius)
      .style("fill", "#fff")
      .style("stroke", "#333")
      node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(d => `Layer ${d.layer + 1}\n${d.activation}`);

    // update node and link positions
    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    // drag handler
    function drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
  
        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
  
        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
  
        return d3
          .drag()
          //.on("start", dragstarted
    }
});
    return (
      <svg ref={svgRef}></svg>
    );
    }

export default NnGraph7;