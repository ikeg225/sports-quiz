import { connectToDatabase } from "../../middleware/database";
import { sqconnect } from "../../middleware/sqdata";

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

export async function articleExists(url) {
  let { db } = await sqconnect();
  return await db.collection("articlestruct").countDocuments({"_id": url}, { limit: 1 }) > 0
}

export async function getArticle(url) {
  let { db } = await sqconnect();
  const article = await db.collection("articlestruct").find({"_id": url}).toArray();
  const structure = article[0]["structure"]
  let title = ""
  let articlehtml = []
  let schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  }
  for (var i = 0; i < structure.length; i++) {
    if (structure[i]["answer"] || i === 0) {
      const question = structure[i]["question"].charAt(0).toUpperCase() + structure[i]["question"].slice(1);
      if (i === 0) {
        title = question
      }
      const tags = structure[i]["tag"]
      articlehtml.push(`<${tags}>${question}</${tags}>`)
      articlehtml.push(`<p>${structure[i]["answer"]}</p>`)
      schema["mainEntity"].push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": structure[i]["answer"]
        }
      })
    }
  }
  return { "title": title, "content": articlehtml.join(''), "schema":  schema }
}