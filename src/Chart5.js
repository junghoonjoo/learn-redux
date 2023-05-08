import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const EpochChart = ({ epochData, validationData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Epoch 데이터 처리
    const labels = epochData.map((_, index) => `Epoch ${index + 1}`);
    const lossData = epochData.map((data) => data.loss);
    const accuracyData = epochData.map((data) => data.accuracy);

    // Validation 데이터 처리
    const valLabels = validationData.map((data) => `Epoch ${data.epoch}`);
    const valLossData = validationData.map((data) => data.val_loss);
    const valAccuracyData = validationData.map((data) => data.val_accuracy);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Loss',
            data: lossData,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Accuracy',
            data: accuracyData,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Validation Loss',
            data: valLossData,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Validation Accuracy',
            data: valAccuracyData,
            borderColor: 'orange',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Epoch',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
      },
    });
  }, [epochData, validationData]);

  return <canvas ref={chartRef}></canvas>;
};

const TrainingChart = () => {
  const rawData = [
    { step: '1/43', loss: 0.56, accuracy: 0.89 },
    { step: '15/43', loss: 0.56, accuracy: 0.90 },
    { step: '43/43', loss: 0.57, accuracy: 0.91, val_loss: 0.45, val_accuracy: 0.99 },
    { step: '1/43', loss: 0.56, accuracy: 0.89 },
    { step: '17/43', loss: 0.53, accuracy: 0.94 },
    { step: '43/43', loss: 0.54, accuracy: 0.99, val_loss: 0.46, val_accuracy: 0.98 },
    { step: '1/43', loss: 0.56, accuracy: 0.89 },
    { step: '15/43', loss: 0.53, accuracy: 0.94 },
    { step: '43/43', loss: 0.54, accuracy: 0.99, val_loss: 0.35, val_accuracy: 0.95 },
  ];

  const groupDataByEpoch = (rawData) => {
    const epochData = [];
    let currentEpoch = [];

    for (let i = 0; i < rawData.length; i++) {
        const data = rawData[i];
        const isLastStep = data.step.includes('43/43');
  
        currentEpoch.push(data);
  
        if (isLastStep) {
          epochData.push(currentEpoch);
          currentEpoch = [];
        }
      }
  
      // Extract validation data
      const validationData = epochData
        .filter((epoch) => epoch[epoch.length - 1].val_loss !== undefined && epoch[epoch.length - 1].val_accuracy !== undefined)
        .map((epoch) => ({
          epoch: epoch.length,
          val_loss: epoch[epoch.length - 1].val_loss,
          val_accuracy: epoch[epoch.length - 1].val_accuracy,
        }));
  
      return (
        <div>
          <h2>Epoch Chart</h2>
          <EpochChart epochData={epochData} validationData={validationData} />
        </div>
      );
    };
  
    return <TrainingChart />;
  };
  
  export default App;
//   In the TrainingChart component, the code continues from the previous code. It groups the data by epoch using the groupDataByEpoch function and extracts the validation data using the validationData function. Then, it renders the EpochChart component passing the epochData and validationData as props.
  
//   The EpochChart component receives the epochData and validationData as props and renders a line chart using chart.js. The epoch data is used to plot the loss and accuracy, while the validation data is used to plot the validation loss and validation accuracy. The chart is rendered within a canvas element using a ref.
  
//   Please note that you may need to install chart.js and import it properly in your project for the code to work.
  
  
  
  
  
  
  
