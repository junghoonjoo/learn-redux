import React, { useEffect } from 'react';
import vis from 'vis-network';

const NnGraph16 = ({ numLayers, neuronsPerLayer, activationFunctions }) => {

  useEffect(() => {
    const container = document.getElementById('network');

    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // add nodes for each neuron
    for (let layer = 0; layer < numLayers; layer++) {
      for (let neuron = 0; neuron < neuronsPerLayer[layer]; neuron++) {
        const node = {
          id: `${layer}-${neuron}`,
          label: activationFunctions[layer],
          color: 'orange',
          font: { size: 24 }
        };
        nodes.add(node);
      }
    }

    // add edges between neurons in adjacent layers
    for (let layer = 0; layer < numLayers - 1; layer++) {
      for (let neuron = 0; neuron < neuronsPerLayer[layer]; neuron++) {
        for (let nextNeuron = 0; nextNeuron < neuronsPerLayer[layer + 1]; nextNeuron++) {
          const edge = {
            id: `${layer}-${neuron}-to-${layer + 1}-${nextNeuron}`,
            from: `${layer}-${neuron}`,
            to: `${layer + 1}-${nextNeuron}`,
            color: { color: 'black' }
          };
          edges.add(edge);
        }
      }
    }

    const data = { nodes, edges };
    const options = {
      height: '100%',
      width: '100%',
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false
      },
      physics: {
        enabled: false
      },
      nodes: {
        shape: 'circle'
      }
    };

    new vis.Network(container, data, options);
  }, [numLayers, neuronsPerLayer, activationFunctions]);

  return <div id="network" style={{ height: '600px' }} />;
};

export default NnGraph16;
