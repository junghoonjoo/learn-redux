const simulateTraining = () => {
    const numEpochs = 10; // 총 Epoch 수
    const stepsPerEpoch = 100; // 각 Epoch 당 Step 수
  
    for (let epoch = 1; epoch <= numEpochs; epoch++) {
      for (let step = 1; step <= stepsPerEpoch; step++) {
        const loss = Math.random() * 10; // 임의의 Loss 값 생성
        const accuracy = Math.random() * 100; // 임의의 Accuracy 값 생성
        updateChart(step, loss, accuracy);
  
        if (step === 1 && epoch === 1) {
          console.log(`Step ${step} - Loss: ${loss.toFixed(2)}, Accuracy: ${accuracy.toFixed(2)}`);
        }
      }
  
      const epochLoss = Math.random() * 10; // 임의의 Epoch Loss 값 생성
      const epochAccuracy = Math.random() * 100; // 임의의 Epoch Accuracy 값 생성
  
      console.log(`Epoch ${epoch} - Loss: ${epochLoss.toFixed(2)}, Accuracy: ${epochAccuracy.toFixed(2)}`);
    }
  };
  