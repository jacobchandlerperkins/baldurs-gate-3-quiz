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
