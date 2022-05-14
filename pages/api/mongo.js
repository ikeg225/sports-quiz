import { connectToDatabase } from "../../middleware/database";

export async function getData() {
  let { db } = await connectToDatabase();

  const quiz = await db.collection("quizzes").find({}).project({ plays: 1, scores: 1 }).toArray();
  return Object.assign({}, ...quiz.map((x) => ({[x._id]: {plays: x.plays, scores: x.scores}})));
}

export async function getQuestions() {
  let { db } = await connectToDatabase();

  let questions = []

  const quiz = await db.collection("quizzes").find({}).project({ questions: 1 }).toArray();

  quiz.map((x) => questions.push(...x.questions))
  return questions;
}