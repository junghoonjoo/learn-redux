import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const getNodeLabel = (layer, idx, activationFunc) =>
  `${layer}${idx}\n${activationFunc}`;

const getNodeColor = (layer) => {
  switch (layer) {
    case 0:
      return "#f94144";
    case 1:
      return "#f3722c";
    case 2:
      return "#f8961e";
    case 3:
      return "#f9c74f";
    case 4:
      return "#90be6d";
    case 5:
      return "#43aa8b";
    case 6:
      return "#577590";
    default:
      return "#1d3557";
  }
};

const NnGraph12 = ({ numLayers, activationFuncs }) => {
  const data = {
    nodes: [],
    links: [],
  };

  // Create nodes
  for (let i = 0; i < numLayers; i++) {
    for (let j = 0; j < activationFuncs[i].length; j++) {
      const activationFunc = activationFuncs[i][j];
      const label = getNodeLabel(i, j, activationFunc);
      const color = getNodeColor(i);
      data.nodes.push({ id: label, label, color });
    }
  }

  // Create links
  for (let i = 0; i < numLayers - 1; i++) {
    for (let j = 0; j < activationFuncs[i].length; j++) {
      const source = getNodeLabel(i, j, activationFuncs[i][j]);
      for (let k = 0; k < activationFuncs[i + 1].length; k++) {
        const target = getNodeLabel(i + 1, k, activationFuncs[i + 1][k]);
        data.links.push({ source, target });
      }
    }
  }

  return (
    <ForceGraph2D
      graphData={data}
      linkDirectionalArrowLength={4}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.2}
      nodeAutoColorBy="color"
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.label;
        const fontSize = 14 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.2
        ); // some padding

        ctx.fillStyle = "#f1faee";
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#1d3557";
        ctx.fillText(label, node.x, node.y);
      }}
    />
  );
};

export default NnGraph12;
