import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
   
    const NnGraph2 = ({ layerSizes, activationFunctions }) => {
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
          .attr('stroke-opacity', 0.6)
          .selectAll('line')
          .data(data.links)
          .join('line')
          .attr('stroke-width', (d) => Math.abs(d.weight) * 5);
    
        const node = svg
          .append('g')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .selectAll('circle')
          .data(data.nodes)
          .join('circle')
          .attr('r', 10)
          .attr('fill', (d) => getColor(d.layer))
          .attr('stroke', (d) => getBorderColor(d.layer))
          .attr('stroke-width', 2);

          const edges = svg.append('g')
          .selectAll('line')
          .data(data.links)
          .join('line')
          .attr('stroke', 'gray');
    
        // Create the nodes  
        node.append('title').text((d) => `Layer: ${d.layer}\nNode: ${d.id}`);
    
        const ticked = () => {
          link
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);
    
          node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        };
    
        simulation.on('tick', ticked);
      }, [layerSizes, activationFunctions]);

      const getColor = (layer) => {
        // Set a color for each layer
        switch (layer) {
          case 0:
            return 'lightblue';
          case layerSizes.length - 1:
            return 'lightgreen';
          default:
            return 'white';
        }
      };
      
      const getBorderColor = (layer) => {
        // Set a border color for each layer
        switch (layer) {
          case 0:
            return 'blue';
          case layerSizes.length - 1:
            return 'green';
          default:
            return 'black';
        }
      };
      return (
        <>
        <div>Hello</div>
        <svg ref={svgRef}></svg>
        </>
      );    
}
export default NnGraph2;