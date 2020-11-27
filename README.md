
# API Project: URL Shortener Microservice for FCC
[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-timestamp)](https://url-shortener-microservice.andradeoromulo.repl.co/)

## About
This is my project of the [URL Shortener Microservice challenge](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice) for the freeCodeCamp API and Microservice certification. It was built based on the boilerplate available [here](https://github.com/freeCodeCamp/boilerplate-project-urlshortener/).

## Endpoints:

Endpoints | Description
----------|-------------
POST `/api/shorturl/new` | Register a URL and create a short URL for it
GET `/api/shorturl/{short_url}` | Redirect to the original URL previously registered

#### Example output:
* `{"original_url":"https://freecodecamp.org","short_url":"1904412960"}`
* `{"error":"invalid url"}`

## How to use:
Be sure to change the `uri` variable in `database.js` according to your own MongoDB server. It's also possible to just create a `.env` file and store this information there in order to keep it hidden and safe. Then, just run on terminal:
```
npm install
npm start
```

## Feedback
I'm a student and I really would like to hear case you have any tips, correction suggestions or comments about any my of projects (🤓).
