import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  if (
    typeof req.query.height === "string" &&
    typeof req.query.weight === "string"
  ) {
    if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
      res.status(400);
      res.send({ error: "malformatted parameters" });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const result: string = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: result,
    });
  } else {
    res.status(400);
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400);
    res.send({ error: "parameters missing" });
  }

  if (typeof target !== "number") {
    res.status(400);
    res.send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target_numeric: number = target;

  if (!Array.isArray(daily_exercises)) {
    res.status(400);
    res.send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises_arr: [] = daily_exercises;

  for (let i: number = 0; i < daily_exercises_arr.length; i++) {
    if (typeof daily_exercises_arr[i] !== "number") {
      res.status(400);
      res.send({ error: "malformatted parameters" });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises_numeric: number[] = daily_exercises;

  res.send(calculateExercises(daily_exercises_numeric, target_numeric));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
