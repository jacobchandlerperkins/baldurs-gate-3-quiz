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
    // (Classes & Subclasses, Backgrounds, Skill Proficiencies sections follow similarly...)
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
