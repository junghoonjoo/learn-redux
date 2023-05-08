import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const LossAccuracyChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const epochs = data.length;
    const stepCounts = data.map((entry) => entry.step.split('/')[1]);
    const lossData = data.map((entry) => entry.loss);
    const accuracyData = data.map((entry) => entry.accuracy);

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
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (context) {
                const datasetIndex = context.datasetIndex;
                const dataIndex = context.dataIndex;
                const value = context.dataset.data[dataIndex];
                const label = context.dataset.label;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

const ValidationChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const epochs = data.length;
    const valLossData = data.map((entry) => entry.val_loss || null);
    const valAccuracyData = data.map((entry) => entry.val_accuracy || null);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: epochs }, (_, index) => `Epoch ${index + 1}`),
        datasets: [
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
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (context) {
                const datasetIndex = context.datasetIndex;
                const dataIndex = context.dataIndex;
                const value = context.dataset.data[dataIndex];
                const label = context.dataset.label;
                return `${label}: ${value}`;
                },
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
                    step: entry.step,
                    loss: entry.loss,
                    accuracy: entry.accuracy,
                    val_loss: entry.val_loss,
                    val_accuracy: entry.val_accuracy,
                  });
                  
                  if (entry.val_loss !== undefined && entry.val_accuracy !== undefined) {
                    epochData.push(currentEpoch);
                    currentEpoch = [];
                  }
                }

                return (
                <div>
                {epochData.map((epoch, index) => (
                <div key={index}>
                <h3>Epoch {index + 1}</h3>
                <LossAccuracyChart data={epoch} />
                <ValidationChart data={epoch} />
                </div>
                ))}
                </div>
                );
                };
                
                export default TrainingChart;
