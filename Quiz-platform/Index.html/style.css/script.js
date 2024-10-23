//index.html file

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title> 

    <!-- Style CSS --> 
    <link rel="stylesheet" href="./style.css">
</head>

<body>

    <div class="main">
        <div class="container">

            <div class="landing-page">
                <img src="https://cdn-icons-png.flaticon.com/512/2958/2958990.png" alt="">
                <h1>Quiz App</h1>
                <div class="line"></div>
                <p>Test your knowledge with this app!</p>

                <button onclick="showGameCategory()">Play Now!</button>
            </div>

            <div class="game-category" style="display: none;">
                <h1>Choose Category</h1>
                <div class="line"></div>

                <div class="category-options">
                    <button onclick="showQuiz(9)">General Knowledge</button>
                    <button onclick="showQuiz(17)">Science and Nature</button>
                    <button onclick="showQuiz(19)">Science Mathematics</button>
                    <button onclick="showQuiz(22)">Geography</button>
                </div>
            </div>

            <div class="quiz" style="display: none;">
                <h2 id="question"></h2>

                <div id="options-container">

                </div>

                <button class="restart-game" onclick="showLandingPage()">Restart Game</button>
            </div>

// style.css file

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    width: 450px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    padding: 20px;
}

.landing-page,
.game-category,
.quiz {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    text-align: center;
    color: rgb(255, 255, 255);
    text-shadow: 2px 2px rgb(100, 100, 100);
}

.landing-page {
    height: 700px;
}

.landing-page>img {
    width: 90px;
}

.landing-page>h1 {
    font-size: 80px;
}

.line {
    width: 200px;
    margin-top: 5px;
    border: 1px solid rgb(89, 56, 196);
}

.landing-page>p {
    font-size: 20px;
    margin: 100px 10px 30px 10px;
}

.landing-page>button,
.category-options>button,
.quiz > button,
.option {
    padding: 5px;
    color: rgb(255, 255, 255);
    width: 300px;
    border-radius: 10px;
    font-size: 25px;
    border: none;
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    cursor: pointer;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.landing-page>button:hover,
.category-options>button:hover,
.quiz>button:hover,
.option:hover {
    background-image: linear-gradient(to left, #6a11cb 0%, #2575fc 100%);
}

.category-options, #options-container {
    margin-top: 40px;
}

.game-category > h1 {
    font-size: 40px;
}

.quiz>h2 {
    font-size: 27px;
    margin: 10px;
}

.option {
    background-image: linear-gradient(120deg, #9d1ccc 0%, #66a6ff 100%);
    width: 300px;
    font-size: 20px;
}

.restart-game {
    position: absolute;
    bottom: 20px;
    padding: 5px;
    color: rgb(255, 255, 255);
    width: 300px;
    border-radius: 10px;
    font-size: 27px;
    border: none;
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

//script.js file

const landingPage = document.querySelector(".landing-page");
const gameCategory = document.querySelector(".game-category");
const quizSection = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

let currentQuestionIndex = 0;
let questions = [];

// Function to show the landing page and hide other sections
function showLandingPage() {
    landingPage.style.display = "";
    gameCategory.style.display = "none";
    quizSection.style.display = "none";
}

// Function to show the game category selection and hide other sections
function showGameCategory() {
    landingPage.style.display = "none";
    gameCategory.style.display = "";
    quizSection.style.display = "none";
}

// Function to show the quiz and hide other sections
function showQuiz(category) {
    landingPage.style.display = "none";
    gameCategory.style.display = "none";
    quizSection.style.display = "";
    // Load questions when quiz section is shown

    getQuestions(category);
}

// Function to fetch questions from the Open Trivia Database API
async function getQuestions(category) {
    const API_URL = `https://opentdb.com/api.php?amount=20&type=multiple&category=${encodeURIComponent(category)}`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Check if the question property exists
        if (data.results && data.results.length > 0 && data.results[0].question) {
            questions = data.results;
            displayQuestion();
        } else {
            console.error("Invalid data format:", data);
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Function to display the current question
function displayQuestion() {
    optionsContainer.style.display = '';
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the currentQuestion object and its question property exist
    if (currentQuestion && currentQuestion.question) {
        questionElement.textContent = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.incorrect_answers.forEach((option) => {
            addOption(option, false);
        });

        addOption(currentQuestion.correct_answer, true);
    } else {
        console.error("Invalid question format:", currentQuestion);
    }
}

// Function to add option buttons to the options container
function addOption(text, isCorrect) {
    const optionElement = document.createElement("button");
    optionElement.textContent = text;
    optionElement.classList.add("option");
    optionElement.dataset.correct = isCorrect;
    optionElement.addEventListener("click", selectOption);
    optionsContainer.appendChild(optionElement);
}

// Function to handle option selection
async function selectOption(event) {
    const selectedOption = event.target;
    const isCorrect = selectedOption.dataset.correct === "true";

    if (isCorrect) {
        questionElement.textContent = "Correct!";
        optionsContainer.style.display = 'none';

    } else {
        questionElement.textContent = "Incorrect!";
        optionsContainer.style.display = 'none';

    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Wait for 0.5 seconds before showing the next question
        await new Promise(resolve => setTimeout(resolve, 500));
        displayQuestion();
    } else {
        // Quiz completed, wait for 0.5 seconds before resetting and showing landing page
        await new Promise(resolve => setTimeout(resolve, 500));
        currentQuestionIndex = 0;
        displayQuestion();
    }
}

// Initial setup
showLandingPage();
        </div>
    </div>
    
    <!-- Script JS -->
    <script src="./script.js"></script>
</body>

</html>