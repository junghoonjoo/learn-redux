import React from 'react';
import Chart from 'chart.js';

const EpochChart = ({ epochData }) => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const labels = epochData.map((_, index) => `Step ${index + 1}`);
    const lossData = epochData.map((data) => data.loss);
    const accuracyData = epochData.map((data) => data.accuracy);

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
              text: 'Step',
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
  }, [epochData]);

  return <canvas ref={chartRef}></canvas>;
};

const TrainingChart = () => {
  const simulateTraining = () => {
    const numEpochs = 2; // 총 Epoch 수
    const stepsPerEpoch = 43; // 각 Epoch 당 Step 수

    const trainingData = [];

    for (let epoch = 1; epoch <= numEpochs; epoch++) {
      const epochData = [];

      console.log(`Epoch ${epoch}`);

      for (let step = 1; step <= stepsPerEpoch; step++) {
        const loss = Math.random() * 10; // 임의의 Loss 값 생성
        const accuracy = Math.random() * 100; // 임의의 Accuracy 값 생성

        const stepData = {
          step: step,
          loss: loss.toFixed(2),
          accuracy: accuracy.toFixed(2),
        };

        epochData.push(stepData);

        if (step === 1 || step === 15 || step === 43) {
          console.log(`${step}/${stepsPerEpoch}: [--->----------] loss:${loss.toFixed(2)}, accuracy:${accuracy.toFixed(2)}`);
        }
      }

      const epochLoss = Math.random() * 10; // 임의의 Epoch Loss 값 생성
      const epochAccuracy = Math.random() * 100; // 임의의 Epoch Accuracy 값 생성

      console.log(`43/${stepsPerEpoch}:[--->----------] loss:${epochLoss.toFixed(2)}, accuracy:${epochAccuracy.toFixed(2)}`);

      trainingData.push(epochData);
    }

    return trainingData;
  };

  const epochData = simulateTraining();

  return (
    <div>
      {epochData.map((data, index) => (
        <div key={index}>
          <h2>Epoch {index + 1}</h2>
          <EpochChart epochData={data} />
        </div>
      ))}
    </div>
  );
};

export default TrainingChart;
