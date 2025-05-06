function calculateBmi(height: number, weight: number): string {
  const height_in_meters: number = height / 100;

  const bmi: number = weight / height_in_meters ** 2;

  if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (pre-obese)";
  } else {
    return "Obese";
  }
}

console.log(calculateBmi(180, 74));
