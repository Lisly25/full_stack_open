// program usage: npm run calculateExercise <arg1> <arg2> ...
// Minimum of 2 args
// Last arg will always be the target amount
// The rest of the args will form the array of daily exercise hours

import { isNotNumber } from "./utils";

type exerciseRating = 1 | 2 | 3;

interface exerciseData {
  daily_exercise_hours: number[];
  target_amount: number;
}

function parseArguments(args: string[]): exerciseData {
  if (args.length < 4) throw new Error("Not enough arguments");

  let target_amount: number = 0;
  const daily_exercise_hours: number[] = [];

  for (let i: number = 2; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error("Provided values were not numbers!");
    } else if (i == args.length - 1) {
      target_amount = Number(args[i]);
    } else {
      daily_exercise_hours.push(Number(args[i]));
    }
  }

  return {
    daily_exercise_hours: daily_exercise_hours,
    target_amount: target_amount,
  };
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: exerciseRating;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(
  daily_exercise_hours: number[],
  target_amount: number
): Result {
  const totalTrainingHours: number = daily_exercise_hours.reduce(
    (acc: number, curr: number): number => acc + curr,
    0
  );
  const expectedTrainingHours: number =
    daily_exercise_hours.length * target_amount;

  const average: number = totalTrainingHours / daily_exercise_hours.length;

  let trainingDays: number = 0;
  let day: number = 0;

  daily_exercise_hours.forEach(() => {
    if (daily_exercise_hours[day] != 0) {
      trainingDays += 1;
    }
    day++;
  });

  let success: boolean = false;
  let rating: exerciseRating = 1;
  let ratingDescription: string = "bad";

  if (totalTrainingHours >= expectedTrainingHours) {
    success = true;
    rating = 3;
    ratingDescription = "Great work - target was achieved!";
  } else if (totalTrainingHours > expectedTrainingHours / 2) {
    success = false;
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength: daily_exercise_hours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target_amount,
    average: average,
  };
}

if (require.main === module) {
  try {
    const { daily_exercise_hours, target_amount } = parseArguments(
      process.argv
    );
    console.log(calculateExercises(daily_exercise_hours, target_amount));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
