const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");
const filename = "index.html";
const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username:"
  },
  {
    type: "list",
    message: "Select your favorite color:",
    name: "color",
    choices: ["green", "blue", "pink", "red"]
  }
];

const askQuestions = () => {
    return inquirer.prompt(questions);
  };