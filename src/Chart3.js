import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

const TrainingChart = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById('training-chart');

    // 초기 차트 설정
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Loss',
            data: [],
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Accuracy',
            data: [],
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

    setChart(newChart);

    return () => {
      // 컴포넌트 언마운트 시 차트 인스턴스 제거
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const updateChart = (step, loss, accuracy) => {
    if (chart) {
      chart.data.labels.push(step.toString());
      chart.data.datasets[0].data.push(loss);
      chart.data.datasets[1].data.push(accuracy);
      chart.update();
    }
  };

  const simulateTraining = () => {
    const numEpochs = 2; // 총 Epoch 수
    const stepsPerEpoch = 43; // 각 Epoch 당 Step 수

    for (let epoch = 1; epoch <= numEpochs; epoch++) {
      console.log(`Epoch ${epoch}`);

      for (let step = 1; step <= stepsPerEpoch; step++) {
        const loss = Math.random() * 10; // 임의의 Loss 값 생성
        const accuracy = Math.random() * 100; // 임의의 Accuracy 값 생성
        updateChart(step, loss, accuracy);

        if (step === 1 || step === 15 || step === 43) {
          console.log(`${step}/${stepsPerEpoch}: [--->----------] loss:${loss.toFixed(2)}, accuracy:${accuracy.toFixed(2)}`);
        }
      }

      const epochLoss = Math.random() * 10; // 임의의 Epoch Loss 값 생성
      const epochAccuracy = Math.random() * 100; // 임의의 Epoch Accuracy 값 생성

      console.log(`43/${stepsPerEpoch}:[--->----------] loss:${epochLoss.toFixed(2)}, accuracy:${epochAccuracy.toFixed(2)}`);
    }
  };

  return (
    <div>
      <canvas id="training-chart"></canvas>
      <button onClick={simulateTraining}>Start Training</button>
    </div>
  );
};

export default TrainingChart;
