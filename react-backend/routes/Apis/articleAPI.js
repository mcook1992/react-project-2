var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET users listing. */
function getArticles() {
  axios
    .get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=mental+health&api-key=ilQ5W4HNLbtSAjTO0BFt3XGTQKrdhdQ6"
    )
    .then(res => console.log(res));
}

module.exports = getArticles;
