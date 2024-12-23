// Define the Race & Subrace questions and scoring
const raceQuestions = [
    {
        question: "You feel most at home in:",
        answers: [
            { answer: "Forests and nature.", score: { woodElf: 2, forestGnome: 2 } },
            { answer: "Bustling cities.", score: { human: 2, highElf: 2 } },
            { answer: "Underground caves.", score: { drow: 2, duergar: 2 } }
        ]
    },
    {
        question: "How would others describe your personality?",
        answers: [
            { answer: "Charming and persuasive.", score: { halfElf: 2, tiefling: 2 } },
            { answer: "Quiet and thoughtful.", score: { halfling: 2, highElf: 2 } },
            { answer: "Strong-willed and determined.", score: { dwarf: 2, dragonborn: 2 } }
        ]
    },
    {
        question: "What is your preferred method of solving conflicts?",
        answers: [
            { answer: "Through diplomacy and understanding.", score: { halfElf: 2, human: 2 } },
            { answer: "With cleverness and creativity.", score: { forestGnome: 2, halfling: 2 } },
            { answer: "By force, when necessary.", score: { orc: 2, dragonborn: 2 } }
        ]
    },
    {
        question: "Which best describes your appearance?",
        answers: [
            { answer: "Elegant and ethereal.", score: { highElf: 2, halfElf: 2 } },
            { answer: "Rugged and hearty.", score: { dwarf: 2, duergar: 2 } },
            { answer: "Exotic and mysterious.", score: { drow: 2, tiefling: 2 } }
        ]
    },
    {
        question: "What is your strongest skill?",
        answers: [
            { answer: "Dexterity and precision.", score: { woodElf: 2, halfling: 2 } },
            { answer: "Strength and endurance.", score: { orc: 2, dragonborn: 2 } },
            { answer: "Intelligence and problem-solving.", score: { forestGnome: 2, highElf: 2 } }
        ]
    },
    {
        question: "How do you view tradition and culture?",
        answers: [
            { answer: "Respect and uphold them.", score: { dwarf: 2, duergar: 2 } },
            { answer: "Adapt and innovate.", score: { human: 2, forestGnome: 2 } },
            { answer: "Challenge and reject them.", score: { tiefling: 2, drow: 2 } }
        ]
    },
    {
        question: "What motivates you the most?",
        answers: [
            { answer: "Protecting loved ones and your home.", score: { halfling: 2, woodElf: 2 } },
            { answer: "Proving your strength and abilities.", score: { dragonborn: 2, orc: 2 } },
            { answer: "Seeking knowledge and discovery.", score: { highElf: 2, forestGnome: 2 } }
        ]
    },
    {
        question: "How do you handle danger?",
        answers: [
            { answer: "With caution and planning.", score: { dwarf: 2, halfling: 2 } },
            { answer: "With bravery and decisiveness.", score: { dragonborn: 2, orc: 2 } },
            { answer: "With cunning and stealth.", score: { drow: 2, tiefling: 2 } }
        ]
    },
    {
        question: "Which environment do you prefer?",
        answers: [
            { answer: "Woodlands and natural areas.", score: { woodElf: 2, forestGnome: 2 } },
            { answer: "Urban settlements.", score: { human: 2, highElf: 2 } },
            { answer: "Mountains or caves.", score: { dwarf: 2, duergar: 2 } }
        ]
    },
    {
        question: "What role do you play in a group?",
        answers: [
            { answer: "The leader or decision-maker.", score: { human: 2, dragonborn: 2 } },
            { answer: "The supporter or problem-solver.", score: { forestGnome: 2, halfling: 2 } },
            { answer: "The wildcard or disruptor.", score: { tiefling: 2, drow: 2 } }
        ]
    }
];

// Function to render the questions on the page
function renderRaceQuestions() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear any existing quiz content

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

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = calculateRaceResults;
    quizContainer.appendChild(submitButton);
}

// Function to calculate the results for Races and Subraces
function calculateRaceResults() {
    // Initialize scores for all subraces
    let scores = {
        woodElf: 0, highElf: 0, drow: 0, forestGnome: 0, halfling: 0, dwarf: 0, duergar: 0, 
        human: 0, tiefling: 0, dragonborn: 0, orc: 0
    };

    // Loop through questions and tally scores based on selected answers
    raceQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="race-${index}"]:checked`);
        if (selectedAnswer) {
            const answerScore = question.answers[selectedAnswer.value].score;
            for (const [key, value] of Object.entries(answerScore)) {
                // Apply a weighting factor based on the question index
                const weight = index < 3 ? 3 : index < 6 ? 2 : 1; // First 3 questions weigh more
                scores[key] += value * weight;
            }
        }
    });

    // Debugging: Log scores to ensure they are updating
    console.log("Final Scores:", scores);

    // Determine the race result
    displayRaceResult(scores);
}

function displayRaceResult(scores) {
    // Find the highest score
    const highestScore = Math.max(...Object.values(scores));

    // Filter subraces with the highest score
    const topRaces = Object.keys(scores).filter(race => scores[race] === highestScore);

    // Determine race result
    let raceResult;

    if (topRaces.length === 1) {
        raceResult = topRaces[0]; // Clear winner
    } else {
        // Use predefined priority to break ties
        const priority = [
            "woodElf", "highElf", "drow", "forestGnome", "halfling", "dwarf", "duergar",
            "human", "tiefling", "dragonborn", "orc"
        ];
        raceResult = topRaces.sort((a, b) => priority.indexOf(a) - priority.indexOf(b))[0];
    }

    // Debugging: Log the result calculation process
    console.log("Top Races:", topRaces, "Highest Score:", highestScore);

    // Display the result
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear the quiz content

    const resultText = document.createElement("p");
    resultText.textContent = `Your race is: ${raceResult}`;
    quizContainer.appendChild(resultText);
}
