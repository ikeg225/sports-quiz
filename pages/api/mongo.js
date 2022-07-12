import { sqconnect } from "../../middleware/sqdata";
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

export async function articleExists(url) {
  let { db } = await sqconnect();
  return await db.collection("articlestruct").countDocuments({"_id": url}, { limit: 1 }) > 0
}

function rand(items) {
  return items[items.length * Math.random() | 0];
}

function removeTags(summary) {
  return summary.replace(/(<\/?p>|<\/?ol>|<\/?li>|<\/?ul>|<\/?h1>|<\/?h2>|<\/?h3>|<ReadMore .*?\/>|<InternalPromo .*?\/>|<ReactPlayer .*?\/>|<ToTable .*?\/>)/g, '')
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
  const optionsOut = ["ad", "outbound", "internal"]
  const options = ["ad", "internal"]
  const internalArticles = new Set([url])

  for (var i = 0; i < structure.length; i++) {
    if (structure[i]["answer"]) {
      const question = structure[i]["question"].charAt(0).toUpperCase() + structure[i]["question"].slice(1);
      if (i === 0) {
        title = question
      }
      const tags = structure[i]["tag"]
      articlehtml.push(`<${tags}>${question}</${tags}>`)
      if (structure[i]["answer"].includes("https://www.youtube.com/watch?")) {
        articlehtml.push(`<ReactPlayer url='${structure[i]["answer"]}' width='100%' />`)
      } else {
        if (tags === "h2") {
          let option = ""
          if (structure[i]["sourcelink"]) {
            option = rand(optionsOut)
          } else {
            option = rand(options)
          }
          if (option === "ad") {
            //
          } else if (option === "outbound") {
            articlehtml.push(`<ReadMore url='${structure[i]["sourcelink"]}' title='${structure[i]["sourcetitle"]}' />`)
          } else if (option === "internal") {
            let notFound = true
            while (notFound) {
              const internal = await db.collection("articlestruct").aggregate([{ $sample: { size: 1 } }]).toArray()
              const internalID = internal[0]["_id"]
              const internalAnswer = internal[0]["structure"][0]["answer"]
              const internalTitle = internal[0]["structure"][0]["question"].charAt(0).toUpperCase() + internal[0]["structure"][0]["question"].slice(1);
              if (!internalArticles.has(internalID)) {
                articlehtml.push(`<InternalPromo url='${internalID}' title='${internalTitle}' summary='${internalAnswer ? removeTags(internalAnswer).slice(0, 100) + "..." : ''}' />`)
                internalArticles.add(internalID)
                notFound = false
              }
            }
          }
        }
        articlehtml.push(`${structure[i]["answer"]}`)
        schema["mainEntity"].push({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": structure[i]["answer"]
          }
        })
      }
    } else if (structure[i]["youtube"]) {
      const question = structure[i]["question"].charAt(0).toUpperCase() + structure[i]["question"].slice(1);
      if (i === 0) {
        title = question
      }
      const tags = structure[i]["tag"]
      articlehtml.push(`<${tags}>${question}</${tags}>`)
      articlehtml.push(`<ReactPlayer url='${structure[i]["youtube"]}' width='100%' />`)
    } else if (i === 0) {
      const question = structure[i]["question"].charAt(0).toUpperCase() + structure[i]["question"].slice(1);
      title = question
      articlehtml.push(`<h1>${question}</h1>`)
    }
  }
  return { "title": title, "content": articlehtml, "schema": JSON.stringify(schema) }
}

export async function getTenRandom() {
  let { db } = await sqconnect();
  if (db.collection("articlestruct").count({}) > 10) {
    return await {}
  } else {
    const internal = await db.collection("articlestruct").find({}).toArray()
    const articles = {}
    for (var article = 0; article < internal.length; article++) {
      const internalID = internal[article]["_id"]
      const internalAnswer = internal[article]["structure"][0]["answer"]
      const internalTitle = internal[article]["structure"][0]["question"].charAt(0).toUpperCase() + internal[article]["structure"][0]["question"].slice(1);
      articles[internalID] = [internalTitle, internalAnswer ? removeTags(internalAnswer).slice(0, 200) + "..." : '']
    }
    return articles
  }
}