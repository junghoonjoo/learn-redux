import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const NnGraph9 = ({ layers, activations }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    //const width = graphRef.current.clientWidth;
    //const height = graphRef.current.clientHeight;
    const width=1000;
    const height=1000;

    const svg = d3.select(graphRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    const nodeRadius = 10;

    // Create nodes for each layer

    const nodes = layers.map((layer, i) => {
      //if (layer%2===0 && layer>1) layer=layer-1;
      console.log("layer",layer);
      console.log('i',i);
      const layerY = (i + 1) * (height / (layers.length + 1));
      //console.log("information",i,i,layer,width/2,layerY,width/2,layerY)

      return {
        id: `layer-${i}`,
        layerIndex: i,
        layerSize: layer,
        x: width / 2,
        y: layerY,
        fx: width / 2,
        fy: layerY
      };
    });

    console.log("nodes",nodes);
    //console.log("length of nodes",nodes.length);

    // Create links between layers
    const links = [];
    for (let i = 0; i < layers.length - 1; i++) {
      for (let j = 0; j < layers[i]; j++) {
        for (let k = 0; k < layers[i + 1]; k++) {
          links.push({
            source: `layer-${i}-${j}`,
            target: `layer-${i + 1}-${k}`
          });
        }
      }
    }

    //console.log("length of link",links.length);

    // Create nodes for each neuron
    layers.forEach((layer, i) => {
      const layerY = (i + 1) * (height / (layers.length + 1));
      for (let j = 0; j < layer; j++) {
        //console.log("j=",j)        
        const neuronX = (width / (layer + 1)) * (j + 1);
        //console.log("neuronX",neuronX);
        nodes.push({
          id: `layer-${i}-${j}`,
          layerIndex: i,
          neuronIndex: j,
          layerSize: layer,
          x: neuronX,
          y: layerY,
          fx: neuronX,
          fy: layerY
        });
        //console.log("nodes",nodes);
      }
    });

    //console.log("layer",layers);
    //console.log("nodes",nodes);
    const getColor = layer => {
        const colors = ['red', 'blue', 'green', 'black', 'orange'];
        return colors[layer];
      };

    const getBorderColor = activationFunction => {
        const borderColorMap = {
          sigmoid: 'green',
          relu: 'blue',
          tanh: 'red',
        };
        return borderColorMap[activationFunction];
      };
  

    // Add nodes and links to the graph
    const linkSelection = svg.selectAll(".link")
                             .data(links)
                             .enter()
                             .append("line")
                             .attr("class", "link")
                             .attr("stroke", "black");


    //console.log("nodes",nodes);       
    //console.log("activations",activations[nodes[5].layerIndex]);                      
    const nodeSelection = svg.selectAll(".node")
                             .data(nodes)
                             .enter()
                             .append("circle")
                             .attr("class", "node")
                             .attr("r", nodeRadius)
                             .attr("fill", "white")
                             //.attr("fill",getColor(nodes.layerIndex))
                             //.attr('fill', (d) => getColor(d.layerIndex))
                             //.attr("stroke", "white")
                             .attr("stroke",(d)=>getBorderColor(activations[d.layerIndex]))
                             .attr("stroke-width", 2)
                             .call(d3.drag().on("drag", drag));

    // Update the positions of the nodes and links on each tick of the simulation
    console.log("nodeSelections",nodeSelection)
    const simulation = d3.forceSimulation(nodes)
                         .force("link", d3.forceLink(links).id(d => d.id))
                         .force("charge", d3.forceManyBody().strength(-100))
                         .force("x", d3.forceX().strength(0.1))
                         .force("y", d3.forceY().strength(0.1))
                         .on("tick", () => {
                           linkSelection.attr("x1", d => d.source.x)
                                        .attr("y1", d => d.source.y)
                                        .attr("x2", d => d.target.x)
                                        .attr("y2", d => d.target.y);

                           nodeSelection.attr("cx", d => d.x)
                                        .attr("cy", d => d.y);
                         });

 // Drag function for nodes
    function drag(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      simulation.alpha(1).restart();
    }

    // Color nodes based on activation function
    // switch (activations) {
    //   case "relu":
    //     nodeSelection.attr("fill", d => d.layerIndex === 0 || d.layerIndex === layers.length - 1 ? "white" : "orange");
    //     break;
    //   case "sigmoid":
    //     nodeSelection.attr("fill", d => d.layerIndex === 0 || d.layerIndex === layers.length - 1 ? "white" : "green");
    //     break;
    //   case "tanh":
    //     nodeSelection.attr("fill", d => d.layerIndex === 0 || d.layerIndex === layers.length - 1 ? "white" : "blue");
    //     break;
    //   default:
    //     nodeSelection.attr("fill", "white");
    // }

    svg.selectAll(".layer-label")
    .data(layers)
    .enter()
    .append("text")
    .attr("class", "layer-label")
    //.attr("x", width / 2)
    .attr("x",40)
    .attr("y", (d, i) => (i + 1) * (height / (layers.length + 1)))
    .attr("text-anchor", "middle")
    .text(d => `${d} neurons`);
    //.text((d)=>`Layer-${d.layerIndex}`)

 // Add text labels for neurons
 layers.forEach((layer, i) => {
   const layerY = (i + 1) * (height / (layers.length + 1));
   for (let j = 0; j < layer; j++) {
     const neuronX = (width / (layer + 1)) * (j + 1);
     svg.append("text")
        .attr("class", "neuron-label")
        .attr("x", neuronX)
        .attr("y", layerY + nodeRadius + 10)
        .attr("text-anchor", "middle")
        .text(`n${j + 1}`);
   }
 });

     // Remove the svg element when the component unmounts
     return () => {
        svg.remove();
      };
    }, [layers, activations]);
  
    return <div ref={graphRef} style={{ width: "100%", height: "100%" }}></div>;
  };


export default NnGraph9