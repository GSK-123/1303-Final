# Who Wants To Be A Millionaire - CLI Game

## Project Overview

### 1.1. Objective:
- **Main Goal**: Create an online quiz system that simulates the popular TV show "Who Wants to Be a Millionaire".
- **Problem/Functionality**: This project aims to provide an engaging and educational game where players can answer trivia questions to win virtual money. It simulates the experience of the TV show by including lifelines and increasing difficulty levels.

### 1.2. Scope:
- **Boundaries**: The project will focus on implementing the core game mechanics of "Who Wants to Be a Millionaire" as a command-line interface (CLI) game.
- **Included Features**:
  - Displaying questions and answer options
  - Accepting user input for answers
  - Implementing lifelines (50-50, Flip-The-Question, Double-Dip, Skip-Question)
  - Tracking the user's progress and winnings
- **Excluded Features**:
  - Advanced graphical user interface (GUI)
  - Online multiplayer functionality
  - Phone-a-Friend and Ask-the-Audience lifelines

## 2. Functional Requirements

### 2.1. Core Features:
- **Question Display and Answer Input**: Display each question with four answer options and accept user input for selecting an answer.
- **Lifeline Integration**: Implement four lifelines that the player can use to assist in answering questions.
- **Progress Tracking**: Track the player's current question, used lifelines, and total winnings.

### 2.2. Additional Features:
- **Database Integration**: Use MongoDB to store and retrieve questions.
- **Lifeline Menu**: Allow the player to open a lifeline menu by pressing 'L' and choose a lifeline to use.

## 3. Technical Requirements

### 3.1. Technology Stack:
- **Programming Language(s)**: JavaScript
- **Frameworks**: None (Node.js runtime)
- **Tools**: 
  - Git for version control
  - Node.js for server-side execution
- **Libraries**: 
  - Mongoose for MongoDB interaction
  - Readline-sync for handling CLI user input

## File Structure

/millionaire-game
|-- /models
| |-- question.js
|-- /scripts
| |-- addQuestions.js
| |-- playGame.js
|-- /config
| |-- db.js
|-- package.json
|-- README.md
