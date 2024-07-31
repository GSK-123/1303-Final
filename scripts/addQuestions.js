const mongoose = require('mongoose');
const Question = require('../models/question'); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost/millionaire', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample questions
const questions = [
  {
    text: 'What is the capital city of Canada?',
    answers: ['Toronto', 'Ottawa', 'Montreal', 'Vancouver'],
    correctAnswer: 'Ottawa',
    difficulty: 1,
    timeLimit: 30
  },
  {
    text: 'Which Canadian province is the only officially bilingual province?',
    answers: ['Ontario', 'Quebec', 'New Brunswick', 'Manitoba'],
    correctAnswer: 'New Brunswick',
    difficulty: 1,
    timeLimit: 30
  },
  {
    text: 'What is the national animal of Canada?',
    answers: ['Moose', 'Beaver', 'Grizzly Bear', 'Canadian Goose'],
    correctAnswer: 'Beaver',
    difficulty: 1,
    timeLimit: 30
  },
  {
    text: 'Which Canadian city hosted the 2010 Winter Olympics?',
    answers: ['Calgary', 'Toronto', 'Montreal', 'Vancouver'],
    correctAnswer: 'Vancouver',
    difficulty: 1,
    timeLimit: 30
  },
  {
    text: 'Which famous Canadian band sang "Tom Sawyer"?',
    answers: ['Rush', 'The Tragically Hip', 'Nickelback', 'Arcade Fire'],
    correctAnswer: 'Rush',
    difficulty: 1,
    timeLimit: 30
  },
  {
    text: 'What is the longest river in Canada?',
    answers: ['Mackenzie River', 'Yukon River', 'St. Lawrence River', 'Columbia River'],
    correctAnswer: 'Mackenzie River',
    difficulty: 2,
    timeLimit: 45
  },
  {
    text: 'Who was the first Prime Minister of Canada?',
    answers: ['John A. Macdonald', 'Alexander Mackenzie', 'Wilfrid Laurier', 'Robert Borden'],
    correctAnswer: 'John A. Macdonald',
    difficulty: 2,
    timeLimit: 45
  },
  {
    text: 'Which Canadian province has the largest land area?',
    answers: ['British Columbia', 'Ontario', 'Quebec', 'Alberta'],
    correctAnswer: 'Quebec',
    difficulty: 2,
    timeLimit: 45
  },
  {
    text: 'What is the tallest mountain in Canada?',
    answers: ['Mount Logan', 'Mount Robson', 'Mount Columbia', 'Mount Saint Elias'],
    correctAnswer: 'Mount Logan',
    difficulty: 2,
    timeLimit: 45
  },
  {
    text: 'Who is the current Prime Minister of Canada? (as of 2024)',
    answers: ['Stephen Harper', 'Justin Trudeau', 'Andrew Scheer', 'Jagmeet Singh'],
    correctAnswer: 'Justin Trudeau',
    difficulty: 2,
    timeLimit: 45
  },
  {
    text: 'In which year did Canada become a confederation?',
    answers: ['1867', '1870', '1882', '1896'],
    correctAnswer: '1867',
    difficulty: 3,
    timeLimit: 60
  },
  {
    text: 'What is the largest island in Canada?',
    answers: ['Vancouver Island', 'Prince Edward Island', 'Baffin Island', 'Newfoundland'],
    correctAnswer: 'Baffin Island',
    difficulty: 3,
    timeLimit: 60
  },
  {
    text: 'Which Canadian city is known as the "City of Festivals"?',
    answers: ['Toronto', 'Montreal', 'Vancouver', 'Ottawa'],
    correctAnswer: 'Montreal',
    difficulty: 3,
    timeLimit: 60
  },
  {
    text: 'Who is the first Canadian astronaut to walk in space?',
    answers: ['Chris Hadfield', 'Marc Garneau', 'Roberta Bondar', 'Steve MacLean'],
    correctAnswer: 'Chris Hadfield',
    difficulty: 3,
    timeLimit: 60
  },
  {
    text: 'What is the official motto of Canada?',
    answers: ['From Sea to Sea', 'Glorious and Free', 'Strong and Free', 'True North Strong and Free'],
    correctAnswer: 'From Sea to Sea',
    difficulty: 3,
    timeLimit: 180
  }
];

// Insert questions into the database
const addQuestions = async () => {
  try {
    await Question.insertMany(questions);
    console.log('Questions added successfully!');
  } catch (err) {
    console.error('Error adding questions:', err);
  } finally {
    mongoose.connection.close();
  }
};

addQuestions();
