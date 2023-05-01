import React from 'react'
import { useState, useEffect } from 'react';
import * as d3 from 'd3';


const NnGraph5 = ({ numLayers, neuronsPerLayer, activationFunctions }) => {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    console.log("numberLayers",numLayers);
    console.log("neuronsPerLayer",neuronsPerLayer);
    console.log("activationFunctions",activationFunctions);
  
    useEffect(() => {
      // Create an array of nodes, with one node for each neuron in the network
      const newNodes = [];
      for (let i = 0; i < numLayers; i++) {
        for (let j = 0; j < neuronsPerLayer; j++) {
          newNodes.push({
            id: `${i}-${j}`,
            layer: i,
            activationFunction: activationFunctions[i],
          });
        }
      }
      setNodes(newNodes);
  
      // Create an array of links, connecting each neuron to the neurons in the next layer
      const newLinks = [];
      for (let i = 0; i < numLayers - 1; i++) {
        for (let j = 0; j < neuronsPerLayer; j++) {
          for (let k = 0; k < neuronsPerLayer; k++) {
            newLinks.push({
              source: `${i}-${j}`,
              target: `${i + 1}-${k}`,
            });
          }
        }
      }
      setLinks(newLinks);

      //console.log("nodes",nodes);

    }, [numLayers, neuronsPerLayer, activationFunctions]);
    //});
  
    useEffect(() => {
      // Set up the D3 force simulation
      console.log("nodes",nodes);
      const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-100))
        .force('link', d3.forceLink(links).id(d => d.id).distance(80))
        .force('x', d3.forceX().x(d => d.layer * 200 + 100))
        .force('y', d3.forceY().y(300))
        .stop();
  
      // Run the simulation for a set number of ticks to stabilize the layout
      for (let i = 0; i < 200; i++) {
        simulation.tick();
      }
  
      // Update the position of each node based on the simulation results
      const updatedNodes = nodes.map(node => ({
        ...node,
        x: node.x,
        y: node.y,
      }));
      setNodes(updatedNodes);
    }, [nodes, links]);
  
    // Helper function to set the color of each node based on its layer
    const getColor = layer => {
      const colors = ['#CCE5FF', '#99C2FF', '#66A3FF', '#3385FF', '#005CCE'];
      return colors[layer];
    };
  
    // Helper function to set the border color of each node based on its activation function
    const getBorderColor = activationFunction => {
      const borderColorMap = {
        sigmoid: '#555555',
        relu: '#FF6600',
        tanh: '#33CCCC',
      };
      return borderColorMap[activationFunction];
    };


    // const handleDragStart = (node) => {
    //     if (!d3Event.active) {
    //       simulation.alphaTarget(0.3).restart();
    //     }
    //     node.fx = node.x;
    //     node.fy = node.y;
    //   };
  
    //   const handleDrag = (node) => {
    //     node.fx = d3Event.x;
    //     node.fy = d3Event.y;
    //   };
  
    //   const handleDragEnd = (node) => {
    //     if (!d3Event.active) {
    //       simulation.alphaTarget(0);
    //     }
    //     node.fx = null;
    //     node.fy = null;
    //   };


    return(
        <>
    <svg width={800} height={600}>
      {links.map(link => (
        <line
          key={`${link.source}-${link.target}`}
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          stroke="#999999"
          strokeWidth={1}
        />
      ))}
           {nodes.map(node => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={node.radius}
                fill={getColor(node)}
                stroke={getBorderColor(node)}
                strokeWidth="1.5px"
              />
            <text
                x={node.x}
                y={node.y}
                dy=".3em"
                fill="#000"
                fontWeight="bold"
                textAnchor="middle"
              >
                {node.id}
              </text>
              </g>
           ))}

      </svg>
        </>
    )
}

export default NnGraph5