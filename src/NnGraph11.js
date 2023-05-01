import React, { useRef, useEffect,useState } from 'react';
import * as d3 from 'd3';
import ForceGraph2D from 'react-force-graph-2d';

const ActivationFunctions = ['relu', 'sigmoid', 'tanh'];

const NnGraph11 = ({ layerSizes, activationFunctions }) => {
    //const [layerCount, setLayerCount] = useState(3);
    const [layerCount, setLayerCount] = useState(layerSizes.length);
    //const [activations, setActivations] = useState(['relu', 'sigmoid', 'sigmoid']);
    const [activations, setActivations] = useState(activationFunctions);

    const NeuronIcon = () => (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#fff" stroke="#000" strokeWidth="3" />
          <path d="M 30 50 Q 50 70 70 50" stroke="#000" strokeWidth="6" fill="none" />
        </svg>
      );

    const layerColors = [
        "#FF00FF",
        "#FFA500",
        "#008000",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#00FFFF",
        "#800080",
        "#808080"
      ];
    // const handleLayerCountChange = (event) => {
    //   const count = parseInt(event.target.value);
    //   setLayerCount(count);
    //   setActivations([...activations.slice(0, count), 'sigmoid']);
    // };
  
    // const handleActivationChange = (event, index) => {
    //   const newActivations = [...activations];
    //   newActivations[index] = event.target.value;
    //   setActivations(newActivations);
    // };
  
    const data = {
      nodes: [...Array(layerCount)].map((_, i) => ({ id: i })),
      links: [...Array(layerCount - 1)].map((_, i) => ({ source: i, target: i + 1 })),
    };

    const graphOptions = {
        graphTitle: "My Neural Network", // 타이틀 지정
        nodeLabel: "name",
      };

    return (
      <div>
        {/* <label>
          Layer count:
          <input type="number" min="1" value={layerCount} onChange={handleLayerCountChange} />
        </label> */}
        {activations.map((activation, i) => (
          <label key={i}>
            {/* Layer {i + 1} activation: */}
            {/* <select value={activation} onChange={(event) => handleActivationChange(event, i)}>
              {ActivationFunctions.map((func) => (
                <option key={func} value={func}>
                  {func}
                </option>
              ))}
            </select> */}
          </label>
        ))}


        <ForceGraph2D
          width={800}
          height={600}          
          graphData={data}
        //   nodeCanvasObject={(node, ctx, globalScale) => {
        //     const { x, y } = node;
        //     const size = 20 / globalScale; // 노드 크기는 전체 확대/축소 비율에 따라 조절
        //     ctx.fillStyle = node.color;
        //     ctx.beginPath();
        //     ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        //     ctx.fill();
        
        //     // 뉴런 모양의 아이콘 그리기
        //     if (node.type === 'neuron') {
        //       const neuronIcon = NeuronIcon(); // NeuronIcon 컴포넌트에서 SVG 코드 생성
        //       ctx.drawImage(
        //         new DOMParser().parseFromString(new XMLSerializer().serializeToString(neuronIcon), 'image/svg+xml')
        //           .firstChild,
        //         x - size,
        //         y - size,
        //         size * 2,
        //         size * 2,
        //       );
        //     }
        //   }}
          {...graphOptions}
          nodeColor={(node) => layerColors[node.id]}          
          nodeLabel={(node) => `L${node.id + 1},
                                AF: ${activations[node.id]},
                                #of Neurons : ${layerSizes[node.id]}`
                            }
          nodeLabelFontSize={2}                                
          linkDirectionalArrowLength={6}
          linkDirectionalArrowColor={() => '#555'}
          linkWidth={2}
        />
      </div>
    );
  }

export default NnGraph11