// TODO: SOMETHING ABOUT A SESSION OR SOMETHING TO SAVE THE WORD IN
// TODO: MAKE SURE THAT THE USER ONLY TYPES IN ONE LETTER
// TODO: MAKE SURE LETTER THAT USER TYPES IS A LETTER

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')
const fs = require('fs')
const expressValidator = require('express-validator');
const validator = require('validator');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const word = getRandomWord(words);

var guessLeft = 8;
var guessedArray = [];
var blankArray = [];
var blank = "_ ";

toBlanks(word)

app.listen(3000, function() {
  console.log("here I go!")
})
console.log("Random Word: " + word);

function getRandomWord(array) {
  return array[Math.floor(Math.random() * (words.length + 1))];
}

function toBlanks(chosenWord) {
  var charNum = chosenWord.length;
  for (i = 0; i < chosenWord.length; i++) {
    blankArray.push(blank);
  }
}

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.get('/', function(req, res) {
  res.render("home", {
    pageTitle: "Home!",
    guessLeft: guessLeft,
    guessedArray: guessedArray,
    blankArray: blankArray,
    word: word
  })
})

app.get('/win', function(req, res){
  res.render("win")
})

app.get('/lose', function(req,res){
  res.render("lose")
})

app.post('/guess', function(req, res) {
  const guessChar = req.body.guessChar;
  guessedArray.push(guessChar + " ")

  req.checkBody("guessChar", "You didn't enter anything!").notEmpty();
  req.checkBody("guessChar", "You didn't enter a letter!").isAlpha();
  req.checkBody("guessChar", "Try again! Either too few or too many!").len(1, 1);

  var errors = req.validationErrors();

  if (errors) {
    res.render('home', {
      pageTitle: "Home!",
      guessLeft: guessLeft,
      guessedArray: guessedArray,
      blankArray: blankArray,
      word: word,
      errors: errors
    })
  } else {
    if (word.indexOf(guessChar) !== (-1)) {
      if (word.indexOf(guessChar) !== (-1)) {
        tempArray = word.split("");
        for (i = 0; i < tempArray.length; i++) {
          if (tempArray[i] === guessChar) {
            blankArray[i] = guessChar
          }
        }
      }
      if (blankArray.indexOf(blank) === -1) {
        return res.redirect("/win")
      }
    } else {
      guessLeft--
      if (guessLeft === 0) {
        return res.redirect("/lose")
      }
    }
    return res.redirect("/")
  }
  })
