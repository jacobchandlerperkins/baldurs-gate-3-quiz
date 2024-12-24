// Define the questions for Race & Subrace
const raceQuestions = [
    {
        question: "You feel most at home in:",
        answers: [
            { answer: "Forests and nature.", score: { woodElf: 1, forestGnome: 1 } },
            { answer: "Bustling cities.", score: { human: 1, highElf: 1 } },
            { answer: "Underground caves.", score: { drow: 1, duergar: 1 } }
        ]
    },
    {
        question: "How would others describe your personality?",
        answers: [
            { answer: "Charming and persuasive.", score: { halfElf: 1, tiefling: 1 } },
            { answer: "Quiet and thoughtful.", score: { halfling: 1, highElf: 1 } },
            { answer: "Strong-willed and determined.", score: { dwarf: 1, dragonborn: 1 } }
        ]
    },
    // More questions go here...
];

// Function to render the questions on the page
function renderQuestions() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear any existing content

    raceQuestions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);

        const answersDiv = document.createElement("div");
        answersDiv.classList.add("answers");

        question.answers.forEach((answer, answerIndex) => {
            const answerLabel = document.createElement("label");
            const answerInput = document.createElement("input");
            answerInput.type = "radio";
            answerInput.name = `race-${index}`; // Group by question index
            answerInput.value = answerIndex; // Store answerIndex for later scoring

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(answer.answer));

            answersDiv.appendChild(answerLabel);
        });

        questionDiv.appendChild(answersDiv);
        quizContainer.appendChild(questionDiv);
    });
}

// Function to calculate the results
function calculateResults() {
    let scores = {
        woodElf: 0, highElf: 0, drow: 0, forestGnome: 0, halfling: 0, dwarf: 0, duergar: 0,
        human: 0, tiefling: 0, dragonborn: 0
    };

    raceQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="race-${index}"]:checked`);
        if (selectedAnswer) {
            const answerScore = question.answers[selectedAnswer.value].score;
            for (const [key, value] of Object.entries(answerScore)) {
                scores[key] += value;
            }
        }
    });

    // Find the highest score
    const highestScore = Math.max(...Object.values(scores));
    const topRaces = Object.keys(scores).filter(race => scores[race] === highestScore);

    // Display the result
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = `Your race is: ${topRaces[0]}`;
}

// Initializing the quiz
document.getElementById("submit-button").addEventListener("click", calculateResults);

// Render the questions on page load
renderQuestions();
