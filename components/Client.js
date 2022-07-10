/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': 'typesense.sportsquiz.org',
    'protocol': 'https'
  }],
  'apiKey': 'Q35ayuJJU5sVgPWLplqeGMG5BIET0oaz',
  'connectionTimeoutSeconds': 2
})

let quizSchema = {
  'name': 'quizzes',
  'fields': [
    {'name': 'title', 'type': 'string' },
    {'name': 'created', 'type': 'int64' },
    {'name': 'plays', 'type': 'int32'},
    {'name': 'avgScore', 'type': 'float'},
    {'name': 'numQuestions', 'type': 'int32' },
    {'name': 'quizType', 'type': 'string', 'facet': true },
    {'name': 'slug', 'type': 'string' },
    {'name': 'mainImage', 'type': 'auto' }
  ],
  'default_sorting_field': 'plays'
}  

//client.collections("quizzes").delete()

//client.collections().create(quizSchema)
//  .catch((error) => {
//    console.log(error)
//})

export default client
