// Define the questions and their associated section categories and scoring
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
    {
        question: "When faced with a difficult choice, you prioritize:",
        answers: [
            { answer: "The greater good of the people.", section: "alignment", score: { good: 2 } },
            { answer: "Personal freedom and self-determination.", section: "alignment", score: { chaotic: 2 } },
            { answer: "Following the rules, no matter what.", section: "alignment", score: { lawful: 2 } }
        ]
    },
    {
        question: "In a conflict, you are more likely to:",
        answers: [
            { answer: "Resolve it peacefully through negotiation.", section: "alignment", score: { good: 2 } },
            { answer: "Let the situation unfold naturally, without intervention.", section: "alignment", score: { neutral: 2 } },
            { answer: "Take control and assert your authority.", section: "alignment", score: { lawful: 2 } }
        ]
    },
    {
        question: "If you were wronged, your instinct would be to:",
        answers: [
            { answer: "Forgive and move on.", section: "alignment", score: { good: 2 } },
            { answer: "Seek revenge to restore balance.", section: "alignment", score: { chaotic: 2 } },
            { answer: "Find a way to report the wrongdoer to the proper authorities.", section: "alignment", score: { lawful: 2 } }
        ]
    },
    {
        question: "How do you view those who break the law?",
        answers: [
            { answer: "They should face consequences for their actions.", section: "alignment", score: { lawful: 2 } },
            { answer: "They're free to do as they wish, as long as they don't hurt anyone.", section: "alignment", score: { chaotic: 2 } },
            { answer: "It depends on the situation and their reasoning.", section: "alignment", score: { neutral: 2 } }
        ]
    },
    {
        question: "In an unfamiliar situation, you:",
        answers: [
            { answer: "Follow the established rules and order.", section: "alignment", score: { lawful: 2 } },
            { answer: "Look for ways to take advantage of the situation.", section: "alignment", score: { chaotic: 2 } },
            { answer: "Act with empathy and consider others' needs.", section: "alignment", score: { good: 2 } }
        ]
    },
    {
        question: "If you had to make a tough moral decision, you'd:",
        answers: [
            { answer: "Do whatever benefits the most people.", section: "alignment", score: { good: 2 } },
            { answer: "Act according to what you think is right, regardless of consequences.", section: "alignment", score: { neutral: 2 } },
            { answer: "Follow the rules and regulations, no matter the cost.", section: "alignment", score: { lawful: 2 } }
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
    {
        question: "Do you value tradition or innovation more?",
        answers: [
            { answer: "Tradition is important to maintain stability.", section: "race", score: { mountainDwarf: 2 } },
            { answer: "Innovation leads to progress and freedom.", section: "race", score: { halfElf: 2 } },
            { answer: "A mix of both is ideal.", section: "race", score: { human: 2 } }
        ]
    },
    {
        question: "Which best describes your relationship with others?",
        answers: [
            { answer: "I enjoy being around others and making friends.", section: "race", score: { halfling: 2 } },
            { answer: "I am more reserved and prefer solitude.", section: "race", score: { elf: 2 } },
            { answer: "I take pride in my community and work with them.", section: "race", score: { dwarf: 2 } }
        ]
    },
    {
        question: "Which type of physical environment do you prefer?",
        answers: [
            { answer: "Dense forests and wild, untamed lands.", section: "race", score: { woodElf: 2 } },
            { answer: "Mountainous regions with solid ground.", section: "race", score: { mountainDwarf: 2 } },
            { answer: "The warmth of the sun and wide-open spaces.", section: "race", score: { human: 2 } }
        ]
    },
    {
        question: "How do you view the concept of family?",
        answers: [
            { answer: "Family is about close bonds and loyalty.", section: "race", score: { dwarf: 2 } },
            { answer: "Family is a loose concept, built on mutual respect and understanding.", section: "race", score: { elf: 2 } },
            { answer: "Family is more about support and shared experience.", section: "race", score: { halfling: 2 } }
        ]
    },
    {
        question: "When faced with danger, how do you react?",
        answers: [
            { answer: "I fight head-on, trusting my strength and skill.", section: "race", score: { human: 2 } },
            { answer: "I analyze the situation before acting.", section: "race", score: { elf: 2 } },
            { answer: "I look for a way to escape or avoid the confrontation.", section: "race", score: { halfling: 2 } }
        ]
    },
    // Classes & Subclasses (10 questions)
    {
        question: "Which of the following most appeals to you?",
        answers: [
            { answer: "Fighting with weapons and physical prowess.", section: "class", score: { fighter: 2, barbarian: 2 } },
            { answer: "Using magic to manipulate reality.", section: "class", score: { wizard: 2, sorcerer: 2, warlock: 2 } },
            { answer: "A combination of martial skill and divine power.", section: "class", score: { paladin: 2, cleric: 2 } }
        ]
    },
    {
        question: "What is your approach to solving problems?",
        answers: [
            { answer: "I use my physical strength and combat skills.", section: "class", score: { fighter: 2 } },
            { answer: "I think things through and plan my actions carefully.", section: "class", score: { wizard: 2 } },
            { answer: "I use charm and deception to manipulate situations.", section: "class", score: { rogue: 2 } }
        ]
    },
    {
        question: "How do you handle a situation where you need to lead others?",
        answers: [
            { answer: "I lead through strength, making tough decisions.", section: "class", score: { fighter: 2, barbarian: 2 } },
            { answer: "I inspire through wisdom and understanding.", section: "class", score: { wizard: 2 } },
            { answer: "I provide guidance through compassion and faith.", section: "class", score: { cleric: 2, paladin: 2 } }
        ]
    },
    {
        question: "If you could have one magical ability, which would it be?",
        answers: [
            { answer: "Control over the elements and nature.", section: "class", score: { druid: 2, sorcerer: 2 } },
            { answer: "To manipulate the minds of others.", section: "class", score: { warlock: 2 } },
            { answer: "To heal and protect others.", section: "class", score: { cleric: 2 } }
        ]
    },
    {
        question: "How would you describe your ideal combat style?",
        answers: [
            { answer: "A balance of strength and strategy.", section: "class", score: { fighter: 2 } },
            { answer: "Fighting ferociously without fear.", section: "class", score: { barbarian: 2 } },
            { answer: "Using magic to outsmart my enemies.", section: "class", score: { wizard: 2 } }
        ]
    },
    {
        question: "Which role do you prefer when working with others?",
        answers: [
            { answer: "I prefer to be in the front, leading the charge.", section: "class", score: { fighter: 2, barbarian: 2 } },
            { answer: "I prefer to stay in the background, supporting the group with magic.", section: "class", score: { wizard: 2 } },
            { answer: "I provide support and guidance to others through healing and protection.", section: "class", score: { cleric: 2, paladin: 2 } }
        ]
    },
    {
        question: "What motivates you the most?",
        answers: [
            { answer: "Power and personal gain.", section: "class", score: { rogue: 2 } },
            { answer: "Helping others and protecting the weak.", section: "class", score: { paladin: 2, cleric: 2 } },
            { answer: "Knowledge and understanding of the world.", section: "class", score: { wizard: 2 } }
        ]
    },
    // Backgrounds (10 questions)
    {
        question: "Which of the following describes your childhood?",
        answers: [
            { answer: "You grew up in a large, bustling city.", section: "background", score: { noble: 2 } },
            { answer: "You grew up in a small, remote village.", section: "background", score: { outlander: 2 } },
            { answer: "You grew up on the streets, learning to fend for yourself.", section: "background", score: { urchin: 2 } }
        ]
    },
    {
        question: "How do you view your role in society?",
        answers: [
            { answer: "You should help others and maintain order.", section: "background", score: { noble: 2, soldier: 2 } },
            { answer: "You should seek to advance your own interests.", section: "background", score: { criminal: 2 } },
            { answer: "You are an adventurer, with no ties to society.", section: "background", score: { outlander: 2 } }
        ]
    },
    // Add the rest of the questions here based on the correct sections
];

// Shuffle the questions randomly
function shuffleQuestions(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

// Calculate the results based on the answers
function calculateResults() {
    let scores = {
        alignment: { lawful: 0, neutral: 0, chaotic: 0, good: 0, evil: 0 },
        race: {},
        class: {},
        background: {}
    };

    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    selectedAnswers.forEach(answer => {
        const questionIndex = answer.name;
        const selectedAnswer = questions[questionIndex].answers[answer.value];
        
        // Update scores based on the selected answer
        for (let key in selectedAnswer.score) {
            if (!scores[selectedAnswer.section][key]) {
                scores[selectedAnswer.section][key] = 0;
            }
            scores[selectedAnswer.section][key] += selectedAnswer.score[key];
        }
    });

    return scores;
}

// Display the result
function displayResult(scores) {
    const resultContainer = document.getElementById("result-container");
    let resultText = "Your D&D character's results:\n\n";

    // Generate alignment result
    let alignment = Object.entries(scores.alignment).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    resultText += `Alignment: ${alignment}\n`;

    // Add additional results (race, class, etc.) here based on the scores

    resultContainer.innerHTML = resultText;
}

// Initialize the quiz
function initializeQuiz() {
    shuffleQuestions(questions);

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear any existing quiz content

    questions.forEach((question, index) => {
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
            answerInput.name = index; // Group by question index
            answerInput.value = answerIndex; // Store answerIndex for later

            answerLabel.appendChild(answerInput);
            answerLabel.appendChild(document.createTextNode(answer.answer));

            answersDiv.appendChild(answerLabel);
        });

        questionDiv.appendChild(answersDiv);
        quizContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = function () {
        const scores = calculateResults();
        displayResult(scores);
    };

    quizContainer.appendChild(submitButton);
}

window.onload = initializeQuiz;
