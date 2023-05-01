import React from 'react';
import ReactDOM from 'react-dom/client';

//import NeuralNetwork from './App';
//import NnGraph from './NnGraph';
//import NnGraph2 from './NnGraph2';
//import NnGraph3 from './NnGraph3';
//import NnGraph4 from './NnGraph4';
import NnGraph9 from './NnGraph9';
//import NnGraph10 from './NnGraph10';
import NnGraph11 from './NnGraph11';
//import NnGraph12 from './NnGraph12';
//import NnGraph13 from './NnGraph13';
//import NnGraph15 from './NnGraph15';
import NnGraph16 from './NnGraph16';

const root = ReactDOM.createRoot(document.getElementById('root'));

let layers=[1000,5000,200,400,100,4];
let activations=['relu','sigmoid','relu','relu','relu','relu'];
//let activations='relu';
root.render(
    <>
    {/* <NeuralNetwork layerSizes={layerSizes} activationFunctions={activationFunctions}/> */}
    {/* <NnGraph/> */}
    {/* <NnGraph2 layerSizes={layerSizes} activationFunctions={activationFunctions}/> */}
    {/* <NnGraph3 layers={layerSizes}/> */}
    {/* <NnGraph4 layers={layerSizes}/> */}
    {/* <NnGraph5 numLayers={3} neuronsPerLayer={3} activationFunctions={activationFunctions}/> */}
    {/* <NnGraph7 /> */}
    {/* <div>Hello</div> */}
    {/* <NnGraph9 layers={layers} activations={activations}/> */}
    {/* <NnGraph10 layerSizes={layers} activationFuncs={activations}/> */}
    <NnGraph11 layerSizes={layers} activationFunctions={activations}/>
    {/* <NnGraph12 numLayers={3} activationFuncs={activations}/> */}
    {/* <NnGraph13 neuronCounts={layers} activationFuncs={activations}/> */}
    {/* <NnGraph14 neuronCounts={layers} activationFuncs={activations}/> */}
    {/* <NnGraph15 /> */}
    {/* <NnGraph16 numLayers={3} neuronsPerLayer={layers} activationFunctions={activations} /> */}
    </>
);


