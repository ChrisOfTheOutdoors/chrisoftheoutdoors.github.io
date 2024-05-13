document.addEventListener('DOMContentLoaded', function() {
    const questionArea = document.getElementById('question-area');
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');
    const questionCardGrp = document.querySelector('.questionCardGrp');
    let currentQuestionId = 1; // Start with the first question
    let history = [];

    // Function to load JSON data
    async function loadQuizData() {
        const response = await fetch('modified_whatMortgageIsRightForMe.json');
        const data = await response.json();
        return data.loansAndQuiz;
    }

    let quizData = [];
    loadQuizData().then(data => {
        quizData = data;
        renderQuestion(currentQuestionId);
    });

    nextButton.onclick = () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const nextId = parseInt(selectedOption.getAttribute('data-next-question'));
            const recommendation = selectedOption.getAttribute('data-recommendation');
            const description = selectedOption.getAttribute('data-description');

            if (recommendation) {
                // add a class the class 'quizResults' to .questionCardGrp so I can restyle the card for the last page of the quiz 
                questionCardGrp.classList.add('quizResults');

                questionArea.innerHTML = `<H3 class="headline recommendedLoan">We recommend you consider a ${recommendation}</h3>`;
                questionArea.innerHTML += `<p class="recommendedDescription">${description}</p>`;

                // hide the next and back button on the last page of the quiz
                nextButton.style.display = 'none';
                backButton.style.display = 'none';

                
                // Optionally, handle the end of the quiz or transitions here
            } else if (nextId) {
                history.push(currentQuestionId);
                currentQuestionId = nextId;
                renderQuestion(currentQuestionId);
            } else {
                questionArea.innerHTML = `<p>Error: Next question not found.</p>`;
            }
        } else {
            alert("Please select an option to proceed.");
        }
    };

    backButton.onclick = () => {
        if (history.length > 0) {
            currentQuestionId = history.pop();
            renderQuestion(currentQuestionId);
        }
    };

    function renderQuestion(questionId) {
        const question = quizData.find(q => q.id === questionId);
        if (!question) {
            questionArea.innerHTML = '<p>Question data not found. Please check your data or contact support.</p>';
            return;
        }

        questionArea.innerHTML = `<p>${question.text}</p>`;
        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'option';
            radioInput.id = option.text;
            radioInput.value = option.text;
            if (option.nextQuestion) {
                radioInput.setAttribute('data-next-question', option.nextQuestion);
            }
            if (option.recommendation) {
                radioInput.setAttribute('data-recommendation', option.recommendation);
            }

            const label = document.createElement('label');
            label.htmlFor = option.text;
            label.innerText = option.text;

            optionElement.appendChild(radioInput);
            optionElement.appendChild(label);
            questionArea.appendChild(optionElement);
        });

        // Automatically select the first option for user convenience
        if (questionArea.querySelector('input[type="radio"]')) {
            questionArea.querySelector('input[type="radio"]').checked = true;
        }
    }
});

