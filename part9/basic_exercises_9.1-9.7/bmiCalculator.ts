//Program usage: npm run calculateBmi <height> <weight>

import { isNotNumber } from "./utils";

interface bodyData {
  height: number;
  weight: number;
}

function parseArguments(args: string[]): bodyData {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

export function calculateBmi(height: number, weight: number): string {
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

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
