//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//import * as d3 from 'd3';

// let nodes = [
//   { name:"ye" },
//   { name:"jun" },
//   { name:"mi" },
//   { name:"sung" },
// ]
// let links = [
//   {  source:"ye", target:"jun" },
//   {  source:"jun", target:"mi" },
//   {  source:"mi", target:"sung" },
//   {  source:"sung", target:"jun" },
// ]

// d3.forceSimulation(nodes)
//   .force('charge', d3.forceManyBody().strength(-200))
//   .force('center', d3.forceCenter(250, 250))
//   .force('link', d3.forceLink(links).id(d => d.name))
//   .on("tick", () => {
//     drawNodes();
//     drawLines();
// }).on("end", () => console.log('end'));


// const container = d3.select("svg");

// const node = 
//       container
//         .select("#node")
//         .selectAll("g")
//         .data(nodes)
//         .join("g")
//         .each(function(d){
//           d3.select(this)
//             .append("circle")
//             .attr("r", 5)
//             .style("fill", "red");
//           d3.select(this)
//             .append("text")
//             .text(d => d.name);
//       })

//   const link = 
//         container
//           .select("#link")
//           .selectAll("line")
//           .data(links)
//           .join("line")
//           .attr("stroke", "black");

// function drawNodes(){
//   node.attr("transform", d =>"translate("+[d.x, d.y]+")" );
// }

// function drawLines() {
//   link
//     .attr("x1", d => d.source.x)
//     .attr("y1", d => d.source.y)
//     .attr("x2", d => d.target.x)
//     .attr("y2", d => d.target.y)

// }



import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const NeuralNetwork = ({ layerSizes, activationFunctions }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = {
      nodes: [],
      links: [],
    };

    // Create nodes for each layer
    for (let i = 0; i < layerSizes.length; i++) {
      const layerSize = layerSizes[i];
      for (let j = 0; j < layerSize; j++) {
        const nodeId = `l${i}n${j}`;
        const node = { id: nodeId, layer: i };
        data.nodes.push(node);

        // Create links between this layer and the previous one
        if (i > 0) {
          const prevLayerSize = layerSizes[i - 1];
          for (let k = 0; k < prevLayerSize; k++) {
            const prevNodeId = `l${i - 1}n${k}`;
            const linkId = `${prevNodeId}-${nodeId}`;
            const link = {
              id: linkId,
              source: prevNodeId,
              target: nodeId,
              weight: Math.random(),
            };
            data.links.push(link);
          }
        }
      }
    }

    const svg = d3.select(svgRef.current);

    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3.forceLink(data.links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      //.attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      //.attr('stroke-width', (d) => Math.abs(d.weight) * 5);
      .attr('stroke-width',0.4);

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 3)
      //.attr('fill', (d) => getColor(d.layer))
      .attr('fill','#69b3a2')
      //.attr('stroke', (d) => getBorderColor(d.layer))
      //.attr('stroke-width', 2)
      //.attr('stroke','#999');
    node.append('title').text((d) => d.id);
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });
  }, []);

  return (
    <>
    <div>Hello</div>
    <svg ref={svgRef}></svg>
    </>
  );
//}
  }
export default NeuralNetwork;
