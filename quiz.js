// Define the questions and their associated section categories
const questions = [
    // Alignment & Personality (7 questions)
    {
        question: "How do you typically react when someone breaks the law for a good cause?",
        answers: [
            { answer: "Support their actions.", section: "alignment", score: { lawful: 2, good: 2 } },
            { answer: "Disapprove, but understand their reasoning.", section: "alignment", score: { neutral: 1 } },
            { answer: "Report them immediately.", section: "alignment", score: { chaotic: 2, evil: 2 } }
        ]
    },
    // Race & Subrace (6 questions)
    {
        question: "How do you feel about nature and the outdoors?",
        answers: [
            { answer: "I feel at home in nature.", section: "race", score: { woodElf: 2 } },
            { answer: "I prefer city life.", section: "race", score: { highElf: 2 } },
            { answer: "I'm indifferent.", section: "race", score: { mountainDwarf: 1, variantHuman: 1 } }
        ]
    },
    // Class & Subclass (7 questions)
    {
        question: "What is your preferred role in a team?",
        answers: [
            { answer: "I prefer to be in the front, fighting and leading.", section: "class", score: { fighter: 2, barbarian: 2 } },
            { answer: "I like supporting others with magic or healing.", section: "class", score: { cleric: 2, paladin: 2 } },
            { answer: "I prefer stealth and trickery.", section: "class", score: { rogue: 2, ranger: 2 } }
        ]
    },
    // Background (7 questions)
    {
        question: "How did you grow up?",
        answers: [
            { answer: "In a wealthy family with many privileges.", section: "background", score: { noble: 2 } },
            { answer: "In a tough environment where I had to fight for survival.", section: "background", score: { criminal: 2, soldier: 2 } },
            { answer: "I grew up in a rural setting, helping others.", section: "background", score: { folkHero: 2 } }
        ]
    },
    // Skill Proficiencies (9 questions)
    {
        question: "You encounter a wounded animal. What do you do?",
        answers: [
            { answer: "Carefully treat its wounds and ensure its safety.", section: "skills", score: { medicine: 2, survival: 2 } },
            { answer: "Try to analyze its behavior and find a safe solution.", section: "skills", score: { nature: 2, animalHandling: 2 } },
            { answer: "Leave it be, as it's not your problem.", section: "skills", score: { insight: 1 } }
        ]
    },
    // Additional questions can follow the same format for other sections...
];

// Shuffle the questions array to randomize the order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display the questions in a randomized order
function displayQuestions() {
    shuffleArray(questions);
    const questionContainer = document.getElementById('question-container');
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <p>${q.question}</p>
            <div class="answers">
                ${q.answers.map((ans, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${i}">
                        ${ans.answer}
                    </label>
                `).join('')}
            </div>
        `;
        questionContainer.appendChild(questionElement);
    });
}

// Collect answers and calculate the final result
function calculateResult(event) {
    event.preventDefault();
    let scores = {
        lawful: 0, chaotic: 0, good: 0, evil: 0,
        woodElf: 0, highElf: 0, mountainDwarf: 0, variantHuman: 0,
        fighter: 0, barbarian: 0, cleric: 0, paladin: 0,
        rogue: 0, ranger: 0, noble: 0, criminal: 0, folkHero: 0,
        medicine: 0, survival: 0, nature: 0, animalHandling: 0
    };

    questions.forEach((q, index) => {
        const selectedAnswerIndex = document.querySelector(`input[name="question${index}"]:checked`)?.value;
        if (selectedAnswerIndex !== undefined) {
            const selectedAnswer = q.answers[selectedAnswerIndex];
            Object.keys(selectedAnswer.score).forEach(key => {
                scores[key] += selectedAnswer.score[key];
            });
        }
    });

    // Calculate result (this part will depend on your scoring logic)
    const resultText = `Your character has the following traits: Lawful: ${scores.lawful}, Chaotic: ${scores.chaotic}, Good: ${scores.good}, Evil: ${scores.evil}.`;

    // Show the result
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result').innerText = resultText;
}

// Initialize the quiz
document.getElementById('quiz-form').addEventListener('submit', calculateResult);

// Display the questions when the page loads
displayQuestions();
