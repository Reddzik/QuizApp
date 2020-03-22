const question = document.querySelector("p.question");

const fillQuestionElements = (data) =>{
    question.innerText = data.question;
    for (let i = 0; i < data.answers.length ; i++) {
        const answerButton = document.querySelector(`button.answer__button-${i+1}`);
        answerButton.innerText = data.answers[i];
    }
};


const showNextQuestion = () =>{
    fetch('/question', {
        method:'GET',
    }).then(res => res.json())
        .then(data => {
            fillQuestionElements(data)
        })
};
showNextQuestion();
