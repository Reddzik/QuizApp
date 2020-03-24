const question = document.querySelector("p.question");
const answerButtons = document.querySelectorAll("button.answer-btn");
const correctAnswersCountField = document.querySelector("p.correctAnswers");
const winMessage = document.querySelector("h2.isWinMessage");
const promptButtons = document.querySelectorAll('button.askForHelp-btn');
const promptResult = document.querySelector("p.promptResult");
const fillQuestionElements = (data) =>{
    if(data.youWin === true) {
        answerButtons.forEach(button => button.disabled = true);
        winMessage.innerText = 'Gratulacje! Wygrałeś życie!';
        winMessage.style.display='block';
        return;
    }
    else if(data.youLose ===true){
        answerButtons.forEach(button => button.disabled = true);
        winMessage.innerText = 'Przegrałeś :O Co się dzieje? Co się dzieje?';
        return;
    }
    question.innerText = data.question;
    for (let i = 0; i < data.answers.length ; i++) {
        const answerButton = document.querySelector(`button.answer_button-${i+1}`);
        answerButton.innerText = data.answers[i];
    }
};
const clearPromptFiled = () =>{
    promptResult.innerText='';
};
const usePrompt = (promptId)=>{
    const promptName = choosePromptName(promptId);
    fetch(`/prompt/${promptName}`, {
        method:"GET",
    }).then(res=> res.json())
        .then(data => chooseCorrectTypeOfPrompt(promptId,data));
};
const choosePromptName =(promptId)=>{
    if(Number(promptId)===0)
        return 'askPCH';
    else if(Number(promptId)===1)
        return 'askStudents';
    else if(Number(promptId)===2)
        return 'tomaszewHelp';
    else
        return 0;
};
const chooseCorrectTypeOfPrompt = (promptId, data) =>{
    if(Number(promptId)===0){
        showPrompt(data);
        return;
    }
    else if(Number(promptId)===1){
        /*Pytanie do studentów*/
    }
    else if(Number(promptId)===2){
        halfOnHalfPrompt(data);
        return;
    }
}
const halfOnHalfPrompt = (data)=>{
    console.log(data.answer);
    const answerBtn = [...answerButtons];
    const buttonsToDelete = answerBtn.filter(button => {
        if(button.innerText===data.answer[0] || button.innerText === data.answer[1])
            return false;
        else
            return true;
    })
    console.log(buttonsToDelete);
    buttonsToDelete.forEach(button=> button.style.display="none");

}
promptButtons.forEach(button => {
    button.addEventListener('click', (e)=>{
        const promptId = button.getAttribute("data-prompt");
        usePrompt(promptId);
    });
});

answerButtons.forEach((button)=>{
    button.addEventListener('click', (event)=>{
        event.preventDefault();
        sendAnswer(button.getAttribute("data-answer"));
    })
});

const showPrompt = (data) =>{
    if(data.answer===null)
        return;
    promptResult.textContent=data.answer;
};

const updateCorrectAnswersCountFiled = (data) =>{
    correctAnswersCountField.innerText = "Poprawne odpowiedzi: "+ data.goodAnswers;
};


const showNextQuestion = () =>{
    fetch('/question', {
        method:'GET',
    }).then(res => res.json())
        .then(data => {
            fillQuestionElements(data);
            clearPromptFiled();
        })
};

const sendAnswer= (answer)=>{
    fetch(`/answer/${answer}`, {
        method:"POST",
    }).then(res => res.json())
        .then(data =>{
            handleFeedbackAfterQuestion(data);
        });
};

showNextQuestion();

const handleFeedbackAfterQuestion = (data) =>{
    updateCorrectAnswersCountFiled(data);
    showNextQuestion();
}