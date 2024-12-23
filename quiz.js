// Define the Alignment & Personality questions and scoring
const alignmentQuestions = [
    {
        question: "How do you typically react when someone breaks the law for a good cause?",
        answers: [
            { answer: "Support their actions.", score: { lawful: -1, chaotic: 1, good: 2 } },
            { answer: "Disapprove, but understand their reasoning.", score: { neutral: 1 } },
            { answer: "Report them immediately.", score: { lawful: 2, chaotic: -1, evil: 2 } }
        ]
    },
    {
        question: "When faced with a difficult choice, you prioritize:",
        answers: [
            { answer: "The greater good of the people.", score: { good: 2 } },
            { answer: "Personal freedom and self-determination.", score: { chaotic: 2 } },
            { answer: "Following the rules, no matter what.", score: { lawful: 2 } }
        ]
    },
    {
        question: "In a conflict, you are more likely to:",
        answers: [
            { answer: "Resolve it peacefully through negotiation.", score: { good: 2 } },
            { answer: "Let the situation unfold naturally, without intervention.", score: { neutral: 2 } },
            { answer: "Take control and assert your authority.", score: { lawful: 2 } }
        ]
    },
    {
        question: "If you were wronged, your instinct would be to:",
        answers: [
            { answer: "Forgive and move on.", score: { good: 2 } },
            { answer: "Seek revenge to restore balance.", score: { chaotic: 2, evil: 2 } },
            { answer: "Report the wrongdoer to the proper authorities.", score: { lawful: 2 } }
        ]
    },
    {
        question: "How do you view those who break the law?",
        answers: [
            { answer: "They should face consequences for their actions.", score: { lawful: 2 } },
            { answer: "They're free to do as they wish, as long as they don't hurt anyone.", score: { chaotic: 2 } },
            { answer: "It depends on the situation and their reasoning.", score: { neutral: 2 } }
        ]
    },
    {
        question: "In an unfamiliar situation, you:",
        answers: [
            { answer: "Follow the established rules and order.", score: { lawful: 2 } },
            { answer: "Look for ways to take advantage of the situation.", score: { chaotic: 2 } },
            { answer: "Act with empathy and consider others' needs.", score: { good: 2 } }
        ]
    },
    {
        question: "If you had to make a tough moral decision, you'd:",
        answers: [
            { answer: "Do whatever benefits the most people.", score: { good: 2 } },
            { answer: "Act according to what you think is right, regardless of consequences.", score: { neutral: 2 } },
            { answer: "Follow the rules and regulations, no matter the cost.", score: { lawful: 2 } }
        ]
    }
];

// Function to render the questions on the page
function renderAlignmentQuestions() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear any existing quiz content

    alignmentQuestions.forEach((question, index) => {
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
            answerInput.name = `alignment-${index}`; // Group by question index
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
    submitButton.onclick = calculateAlignmentResults;
    quizContainer.appendChild(submitButton);
}

// Function to calculate the results for Alignment & Personality
function calculateAlignmentResults() {
    let scores = { lawful: 0, chaotic: 0, good: 0, evil: 0, neutral: 0 };

    alignmentQuestions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="alignment-${index}"]:checked`);
        if (selectedAnswer) {
            const answerScore = question.answers[selectedAnswer.value].score;
            for (const [key, value] of Object.entries(answerScore)) {
                scores[key] += value;
            }
        }
    });

    displayAlignmentResult(scores);
}

// Function to display the alignment result
function displayAlignmentResult(scores) {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear the quiz content

    const alignmentText = determineAlignment(scores);
    const resultText = document.createElement("p");
    resultText.textContent = `Your alignment is: ${alignmentText}`;
    quizContainer.appendChild(resultText);
}

// Helper function to determine alignment based on scores
function determineAlignment(scores) {
    const isLawful = scores.lawful > scores.chaotic;
    const isGood = scores.good > scores.evil;

    if (isLawful && isGood) return "Lawful Good";
    if (isLawful && !isGood) return "Lawful Evil";
    if (!isLawful && isGood) return "Chaotic Good";
    if (!isLawful && !isGood) return "Chaotic Evil";

    return "Neutral";
}

// Render the alignment questions on page load
window.onload = renderAlignmentQuestions;

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
    let scores = {
        woodElf: 0, highElf: 0, drow: 0, forestGnome: 0, halfling: 0, dwarf: 0, duergar: 0, 
        human: 0, tiefling: 0, dragonborn: 0, orc: 0
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

    displayRaceResult(scores);
}

// Function to display the race result
function displayRaceResult(scores) {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear the quiz content

    const highestScore = Math.max(...Object.values(scores));
    const topRaces = Object.keys(scores).filter(race => scores[race] === highestScore);
    const raceResult = topRaces.length === 1 ? topRaces[0] : "Mixed Heritage";

    const resultText = document.createElement("p");
    resultText.textContent = `Your race is: ${raceResult}`;
    quizContainer.appendChild(resultText);
}

// Render the race questions on page load
window.onload = renderRaceQuestions;
