type exerciseRating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: exerciseRating;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
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

  for (let day in daily_exercise_hours) {
    if (daily_exercise_hours[day] != 0) trainingDays += 1;
  }

  let success: boolean = false;
  let rating: exerciseRating = 1;
  let ratingDescription: string =
    "The target was missed, exercised less than half as much as planned";

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
