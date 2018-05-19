export function tripleStep(stepsCount: number): number {
  if (stepsCount <= 0) throw new Error(`${stepsCount} of steps is not a real stair!`);
  else if (stepsCount === 1) return 1;
  else if (stepsCount === 2) return 2;
  else if (stepsCount === 3) return 4;
  else {
    let numberOfWaysTo3StepsBelow = tripleStep(1);
    let numberOfWaysTo2StepsBelow = tripleStep(2);
    let numberOfWaysTo1StepBelow = tripleStep(3);

    for (let currentStep = 4; currentStep < stepsCount; currentStep++) {
      const numberOfWaysToCurrent =
        numberOfWaysTo1StepBelow + numberOfWaysTo2StepsBelow + numberOfWaysTo3StepsBelow;
      
      numberOfWaysTo3StepsBelow = numberOfWaysTo2StepsBelow;
      numberOfWaysTo2StepsBelow = numberOfWaysTo1StepBelow;
      numberOfWaysTo1StepBelow = numberOfWaysToCurrent;
    }

    return numberOfWaysTo1StepBelow + numberOfWaysTo2StepsBelow + numberOfWaysTo3StepsBelow;
  }
}
