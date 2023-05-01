import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ActivationFunctions = {
    none: {
      name: 'None',
      func: d => d,
    },
    sigmoid: {
      name: 'Sigmoid',
      func: d => 1 / (1 + Math.exp(-d)),
    },
    relu: {
      name: 'ReLU',
      func: d => Math.max(0, d),
    },
    tanh: {
      name: 'Tanh',
      func: d => Math.tanh(d),
    },
  };


const NnGraph10 = ({ layerSizes, activationFuncs }) => {

    const svgRef = useRef(null);

    const createNodes = () => {
      const nodes = [];
      const numLayers = layerSizes.length;
  
      for (let i = 0; i < numLayers; i++) {
        const size = layerSizes[i];
        const af = activationFuncs[i];
        const afName = ActivationFunctions[af].name;
  
        for (let j = 0; j < size; j++) {
          const node = {
            id: `${i}-${j}`,
            layer: i,
            activationFunction: afName,
          };
          nodes.push(node);
        }
      }
  
      return nodes;
    };
  
    const createLinks = nodes => {
      const links = [];
      const numLayers = layerSizes.length;
  
      for (let i = 0; i < numLayers - 1; i++) {
        const size1 = layerSizes[i];
        const size2 = layerSizes[i + 1];
  
        for (let j = 0; j < size1; j++) {
          for (let k = 0; k < size2; k++) {
            const source = `${i}-${j}`;
            const target = `${i + 1}-${k}`;
            const link = {
              source,
              target,
            };
            links.push(link);
          }
        }
      }
  
      return links;
    };

    const activationFuncLabels = () => {
        const labels = [];
        const numLayers = layerSizes.length;
    
        for (let i = 0; i < numLayers; i++) {
          const size = layerSizes[i];
          const af = activationFuncs[i];
          const afName = ActivationFunctions[af].name;
    
          const label = {
            id: `aflabel-${i}`,
            layer: i,
            activationFunction: afName,
          };
          labels.push(label);
        }
    
        return labels;
      };
      useEffect(() => {
        const svg = d3.select(svgRef.current);
    
        //const width = +svg.attr('width');
        //const height = +svg.attr('height');
        const width=1000;
        const height=1000;
    
        const nodes = createNodes();
        const links = createLinks(nodes);
        const labels = activationFuncLabels();
    
        const simulation = d3.forceSimulation(nodes)
          .force('link', d3.forceLink(links).id(d => d.id))
          .force('charge', d3.forceManyBody().strength(-100))
          .force('center', d3.forceCenter(width / 2, height / 2));

          const drag = d3.drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          });
      

            // Render links
        const link = svg.append('g')
                    .selectAll('path')
                    .data(links)
                    .join('path')
                    .attr('stroke', '#999')
                    .attr('stroke-opacity', 0.6)
                    .attr('marker-end', 'url(#arrowhead)');

            // Render nodes
        const node = svg.append('g')
                    .selectAll('circle')
                    .data(nodes)
                    .join('circle')
                    .attr('r', 15)
                    //.attr('fill', (d) => color(d.group))
                    .call(drag);

            // Add labels to nodes
            node.append('title')
                .text((d) => d.id);

            node.append('text')
                .text((d) => d.group)
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle')
                .style('font-size', '10px');

            node.append('text')
                .text((d) => d.activationFuncLabel)
                .attr('dy', '-1.25em')
                .attr('text-anchor', 'middle')
                .style('font-size', '10px');                    


                // Update node and link positions on tick
            simulation.on('tick', () => {
                link.attr('d', (d) => {
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                //return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
                });
                node.attr('transform', (d) => `translate(${d.x},${d.y})`);
               
    },[]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <marker id="arrowhead" viewBox="0 -5 10 10" refX="8" refY="0"
        markerWidth="5" markerHeight="5"
        orient="auto">
        <path d="M 0,-5 L 10 ,0 L 0,5" fill="#999" />
      </marker>
    </svg>
  );

    });

}
  export default NnGraph10;
