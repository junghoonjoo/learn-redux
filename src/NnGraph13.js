import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const NnGraph13 = ({ neuronCounts, activationFuncs }) => {
  const nodes = [];
  const links = [];

  // create nodes
  for (let layer = 0; layer < neuronCounts.length; layer++) {
    for (let neuron = 0; neuron < neuronCounts[layer]; neuron++) {
      nodes.push({ id: `${layer}-${neuron}`, layer, neuron });
    }
  }

  // create links
  for (let layer = 0; layer < neuronCounts.length - 1; layer++) {
    for (let from = 0; from < neuronCounts[layer]; from++) {
      for (let to = 0; to < neuronCounts[layer + 1]; to++) {
        links.push({
          source: `${layer}-${from}`,
          target: `${layer + 1}-${to}`,
          label: activationFuncs[layer],
        });
      }
    }
  }

  return (
    <ForceGraph2D
      width={1000}
      height={1000}
      graphData={{ nodes, links }}
      nodeAutoColorBy="layer"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.layer === 0 ? "Input" : `Neuron ${node.neuron}`;
        const fontSize = 12 / globalScale;
        //const fontSize=1
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = "#000";
        ctx.fillText(label, node.x + 12, node.y + 4 + fontSize);
      }}
      linkCanvasObjectMode={() => "after"}
      linkCanvasObject={(link, ctx) => {
        const fontSize = 3;
        const startNode = link.source;
        const endNode = link.target;
        const startNeuron = startNode.neuron;
        const endNeuron = endNode.neuron;
        const label = link.label;
        const startNodeRadius = 6;
        const endNodeRadius = 6;
        const startNodeX = startNode.x + startNodeRadius * Math.cos(startNeuron * 2 * Math.PI / neuronCounts[startNode.layer]);
        const startNodeY = startNode.y + startNodeRadius * Math.sin(startNeuron * 2 * Math.PI / neuronCounts[startNode.layer]);
        const endNodeX = endNode.x + endNodeRadius * Math.cos(endNeuron * 2 * Math.PI / neuronCounts[endNode.layer]);
        const endNodeY = endNode.y + endNodeRadius * Math.sin(endNeuron * 2 * Math.PI / neuronCounts[endNode.layer]);

        // arrow
        ctx.beginPath();
        ctx.moveTo(endNodeX, endNodeY);
        ctx.lineTo(startNodeX, startNodeY);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // text
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = "#000";
        const textX = (startNodeX + endNodeX) / 2;
        const textY = (startNodeY + endNodeY) / 2;
        ctx.fillText(label, textX, textY);
      }}
    />
  );
};

export default NnGraph13;