import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
