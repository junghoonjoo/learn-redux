import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NnGraph = () => {
    const svgRef = useRef(null);
  
    useEffect(() => {
      const data = {
        nodes: [
          { id: 'input1' },
          { id: 'input2' },
          {id:'input3'},
          { id: 'hidden1' },
          {id:'hidden2'},
          { id: 'output' },
        ],
        links: [
          { source: 'input1', target: 'hidden1' },
          {source:'input1',target:'hidden2'},
          {source:'input2',target:'hidden2'},
          { source: 'input2', target: 'hidden1' },
          
          { source: 'hidden1', target: 'output' },
        ],
      };
  
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
        .attr('stroke-width', 0.3);
  
      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(data.nodes)
        .join('circle')
        .attr('r', 4)
        .attr('fill', '#69b3a2');
  
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
  
    return <svg ref={svgRef}></svg>;
  };
  
  export default NnGraph;