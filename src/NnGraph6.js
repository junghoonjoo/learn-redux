import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const NnGraph6 = ({ layerSizes, activationFunctions }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(links).distance(80))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    const nodeGroup = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(drag(simulation));

    nodeGroup.append('circle')
      .attr('r', 20)
      .attr('fill', getColor)
      .attr('stroke', getBorderColor)
      .attr('stroke-width', 2);

    nodeGroup.append('text')
      .text((d, i) => `Layer ${i + 1}`)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('dy', 5);

    nodeGroup.append('text')
      .text((d, i) => activationFunctions[i])
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('dy', 20);

    simulation.on('tick', () => {
      link.attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });
    setWidth(svg.node().getBoundingClientRect().width);
    setHeight(svg.node().getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    const newNodes = createNodes(layerSizes);
    const newLinks = createLinks(newNodes);
    setNodes(newNodes);
    setLinks(newLinks);
  }, [layerSizes]);

  const createNodes = (layerSizes) => {
    const numLayers = layerSizes.length;
    const nodes = [];
    const offsetY = height / (numLayers + 1);
    const offsetX = width / 2;
    for (let i = 0; i < numLayers; i++) {
      const layerSize = layerSizes[i];
      const offsetX2 = (width - (layerSize - 1) * 40) / 2;
      for (let j = 0; j < layerSize; j++) {
        nodes.push({
          layer: i,
          x: offsetX2 + j * 40,
          y: (i + 1) * offsetY,
        });
      }
    }
    return nodes;
  };

  const createLinks = (layers) => {
    const links = [];
    for (let i = 0; i < layers.length - 1; i++) {
      const sourceLayer = layers[i];
      const targetLayer = layers[i + 1];
      for (let j = 0; j < sourceLayer.nodes.length; j++) {
        for (let k = 0; k < targetLayer.nodes.length; k++) {
          const link = {
            source: `${i},${j}`,
            target: `${i + 1},${k}`
          };
          links.push(link);
        }
      }
    }
    return links;
  }

}

export default NnGraph6;