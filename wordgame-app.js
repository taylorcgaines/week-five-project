// TODO: SOMETHING ABOUT A SESSION OR SOMETHING TO SAVE THE WORD IN
// TODO: MAKE SURE THAT THE USER ONLY TYPES IN ONE LETTER
// TODO: MAKE SURE LETTER THAT USER TYPES IS A LETTER

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')
const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const word = getRandomWord(words);

var guessLeft = 8;
var guessedArray = [];
// var guessChar =
var blankArray = [];

toBlanks(word)

app.listen(3000,function(){
  console.log("here I go!")
})
console.log("Random Word: " + word);

function getRandomWord(array){
  return array[Math.floor(Math.random() * (words.length + 1))];
}

function toBlanks(chosenWord){
  var charNum = chosenWord.length;
  for (i=0; i<chosenWord.length; i++){
  blankArray.push("- ");
  }
}


app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
  res.render("home",{
    pageTitle: "Home!",
    guessLeft: guessLeft,
    guessedArray: guessedArray,
    blankArray: blankArray,
    word: word
  })
})

app.post('/guess', function(req,res){
  let guessChar = req.body.guessChar;
  guessedArray.push(guessChar)
  res.redirect('/')
})
