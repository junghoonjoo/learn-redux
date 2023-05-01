import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NnGraph14 = ({ layerSizes, activationFunctions }) => {
  const numLayers = layerSizes.length;
  const activationFuncLabels = ['Input'];
  for (let i = 1; i < numLayers; i++) {
    activationFuncLabels.push(activationFunctions[i - 1]);
  }
  activationFuncLabels.push('Output');

  const nodes = [];
  for (let i = 0; i < numLayers; i++) {
    for (let j = 0; j < layerSizes[i]; j++) {
      nodes.push({
        id: `L${i}N${j}`,
        label: `L${i}N${j}`,
        layer: i,
        activationFunction: activationFuncLabels[i],
      });
    }
  }

  const links = [];
  for (let i = 0; i < numLayers - 1; i++) {
    for (let j = 0; j < layerSizes[i]; j++) {
      for (let k = 0; k < layerSizes[i + 1]; k++) {
        links.push({
          source: `L${i}N${j}`,
          target: `L${i + 1}N${k}`,
        });
      }
    }
  }

  return (
    <ForceGraph2D
      width={800}
      height={600}
      graphData={{ nodes, links }}
      nodeLabel="label"
      linkDirectionalArrowLength={8}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      linkLabel="weight"
      linkWidth={1.5}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.activationFunction ? `${node.label}\n(${node.activationFunction})` : node.label;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(label, node.x, node.y);
      }}
    />
  );
};

export default NnGraph14;