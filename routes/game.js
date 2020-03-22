 function Game(app) {
    let  goodAnswers = 0;
    let questionToTheCrowdUsed = false;
    let callTheFriendUsed = false;
    let halfOnHalfUsed = false;
    const dataQuestions = [
        {
            question: 'Jaka funkcja wypisuje nową linię w konsoli w języku Java',
            answers: ['System.out.println', 'console.log', 'Console.writeln', 'Console.println'],
            correctAnswer: 0,
        },
        {
            question: 'który z poniższych typów pozwala przechowywać liczby zmiennoprzecinkowe',
            answers: ['boolean', 'char', 'integer', 'double'],
            correctAnswer: 3,
        }, {
            question: '.NET Core jest oparty o język: ',
            answers: ['Java', 'JavaScript', 'Go', 'C#'],
            correctAnswer: 3,
        }, {
            question: 'Która firma stworzyła React.js',
            answers: ['Amazon', 'Microsoft', 'Facebook', 'Netflix'],
            correctAnswer: 2,
        }
    ];

    app.get('/question', (req, res) => {
        if (goodAnswers === dataQuestions.length) {
            res.json({
                youWin: true,
            });
            res.end();
        }

        const {question, answers} = dataQuestions[goodAnswers]; // if 0 -> 1st question
        res.json({
            question,
            answers
        });
        res.end();
    });

}
module.exports= Game;
