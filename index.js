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
    choices: ["green", "blue", "grey", "black"]
  }
];

const askQuestions = () => {
    return inquirer.prompt(questions);
  };

  const getGitResponse = data => {
    const queryUrl = `https://api.github.com/users/${data.username}`;
    const starredUrl = `https://api.github.com/users/${data.username}/starred`;
    return axios.all([axios.get(queryUrl), axios.get(starredUrl)]);
  };

  const readFromFile = page => {
    fs.readFile(`${page}`, (err, data) => {
      if (err) console.log(chalk.inverse.yellow(`Something went wrong: ${err}`));
      return data;
    });
  };

  const convertToPDF = page => {
    const options = {
      format: "Legal"
    };
    pdf.create(page, options).toFile("./profile.pdf", function(err, res) {
      if (err) return console.log(chalk.yellow(`Something went wrong ${err}`));
      console.log(chalk.green(`Profile PDF written`));
    });
  };

  async function init() {
    try {
      const data = await askQuestions();
      const responseArr = await getGitResponse(data);
      const page = generateHTML(data, responseArr);
      writeToFile(filename, page);
      convertToPDF(page);
    } catch (error) {
      console.log(chalk.inverse.yellow(`There was a problem ${error}`));
    }
  }
  
  init();