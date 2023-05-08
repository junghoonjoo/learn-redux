import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const EpochChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Extract data
    const epochs = data.length;
    const lossData = data.map((entry) => entry.loss);
    const accuracyData = data.map((entry) => entry.accuracy);
    const valLossData = data.map((entry) => entry.val_loss || null);
    const valAccuracyData = data.map((entry) => entry.val_accuracy || null);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: epochs }, (_, index) => `Epoch ${index + 1}`),
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
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

const TrainingChart = ({ data }) => {
  const epochData = [];
  let currentEpoch = [];

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    currentEpoch.push({
      loss: entry.loss,
      accuracy: entry.accuracy,
      val_loss: entry.val_loss,
      val_accuracy: entry.val_accuracy,
    });

    if (entry.step.includes('43/43')) {
      epochData.push([...currentEpoch]);
      currentEpoch = [];
    }
  }

  return (
    <div>
      <h2>Epoch Chart</h2>
      <EpochChart data={epochData} />
    </div>
  );
};

export default TrainingChart;
