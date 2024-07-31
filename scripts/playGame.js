const mongoose = require('mongoose');
const readlineSync = require('readline-sync');
const Question = require('../models/question');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/millionaire', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
  startGame();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const startGame = async () => {
  try {
    const questions = await Question.find().sort({ difficulty: 1 }); // Get questions sorted by difficulty
    let moneyWon = 0;
    const lifelines = {
      fiftyFifty: true,
      flipTheQuestion: true,
      doubleDip: true,
      skipQuestion: true
    };
    let usedDoubleDip = false;

    for (let i = 0; i < questions.length; i++) {
      let question = questions[i];
      console.log(`\nQuestion: ${question.text}`);
      question.answers.forEach((answer, index) => {
        console.log(`${index + 1}. ${answer}`);
      });

      let userAnswer = readlineSync.question('Your answer (1-4) or lifeline (L): ');

      // Handle lifeline menu
      if (userAnswer.toLowerCase() === 'l') {
        userAnswer = lifelineMenu(lifelines, questions, i);
      } else {
        userAnswer = parseInt(userAnswer);
      }

      if (userAnswer < 1 || userAnswer > 4 || isNaN(userAnswer)) {
        console.log('Invalid answer. Please enter a number between 1 and 4.');
        continue;
      }

      if (question.answers[userAnswer - 1] === question.correctAnswer) {
        moneyWon += getMoneyForQuestion(question.difficulty);
        console.log('Correct! You have won $' + moneyWon);
        usedDoubleDip = false;
      } else {
        if (usedDoubleDip) {
          console.log('Incorrect. You have one more chance.');
          userAnswer = readlineSync.questionInt('Your answer (1-4): ');
          if (question.answers[userAnswer - 1] === question.correctAnswer) {
            moneyWon += getMoneyForQuestion(question.difficulty);
            console.log('Correct! You have won $' + moneyWon);
            usedDoubleDip = false;
          } else {
            console.log('Wrong answer. Game over.');
            break;
          }
        } else {
          console.log('Wrong answer. Game over.');
          break;
        }
      }
    }

    console.log(`Game over. You won a total of $${moneyWon}.`);
  } catch (err) {
    console.error('Error during the game:', err);
  } finally {
    mongoose.connection.close();
  }
};

const lifelineMenu = (lifelines, questions, currentIndex) => {
  console.log('\nLifelines:');
  console.log(`1. 50-50 (${lifelines.fiftyFifty ? 'Available' : 'Used'})`);
  console.log(`2. Flip-The-Question (${lifelines.flipTheQuestion ? 'Available' : 'Used'})`);
  console.log(`3. Double-Dip (${lifelines.doubleDip ? 'Available' : 'Used'})`);
  console.log(`4. Skip-Question (${lifelines.skipQuestion ? 'Available' : 'Used'})`);
  
  const lifelineChoice = readlineSync.questionInt('Choose a lifeline (1-4) or 0 to cancel: ');

  switch (lifelineChoice) {
    case 1: // 50-50
      if (lifelines.fiftyFifty) {
        lifelines.fiftyFifty = false;
        const incorrectAnswers = questions[currentIndex].answers.filter(ans => ans !== questions[currentIndex].correctAnswer);
        const answersToRemove = incorrectAnswers.slice(0, 2);
        questions[currentIndex].answers = questions[currentIndex].answers.map(ans => answersToRemove.includes(ans) ? null : ans);
        console.log(`50-50 used. Remaining answers:`);
        questions[currentIndex].answers.forEach((answer, index) => {
          if (answer) console.log(`${index + 1}. ${answer}`);
        });
      } else {
        console.log('50-50 already used.');
      }
      break;
    case 2: // Flip-The-Question
      if (lifelines.flipTheQuestion) {
        lifelines.flipTheQuestion = false;
        const newQuestion = questions.find(q => q.difficulty === questions[currentIndex].difficulty && q._id.toString() !== questions[currentIndex]._id.toString());
        if (newQuestion) {
          questions[currentIndex] = newQuestion;
          console.log(`Flipped question. New question: ${questions[currentIndex].text}`);
          questions[currentIndex].answers.forEach((answer, index) => {
            console.log(`${index + 1}. ${answer}`);
          });
        } else {
          console.log('No alternative question available.');
        }
      } else {
        console.log('Flip-The-Question already used.');
      }
      break;
    case 3: // Double-Dip
      if (lifelines.doubleDip) {
        lifelines.doubleDip = false;
        console.log('Double-Dip used. You have two chances to answer.');
        return readlineSync.questionInt('Your answer (1-4): ');
      } else {
        console.log('Double-Dip already used.');
      }
      break;
    case 4: // Skip-Question
      if (lifelines.skipQuestion && currentIndex < 5) {
        lifelines.skipQuestion = false;
        console.log('Skipped question.');
        return readlineSync.questionInt('Your answer (1-4): '); // Move to the next question
      } else {
        console.log('Skip-Question already used or not allowed.');
      }
      break;
    case 0:
      return readlineSync.questionInt('Your answer (1-4): '); // Return to question
    default:
      console.log('Invalid lifeline choice.');
      return readlineSync.questionInt('Your answer (1-4): ');
  }

  return readlineSync.questionInt('Your answer (1-4): ');
};

const getMoneyForQuestion = (difficulty) => {
  const prizeMoney = [0, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
  return prizeMoney[difficulty];
};
