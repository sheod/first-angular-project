module.exports = function(app) {
    //let template = require('../templates/new-game.html');
    app.component('ticTacToe', {
        controller: function () {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = 'ticTacToe.js';
            document.body.appendChild(s);

            let Player = ticTacToe.Player;
            let Game = ticTacToe.Game;

            let firstPlayer = new Player({
                name: 'Player 1',
                figure: 'cross',
                turn: true,
            });
            console.log
            let secondPlayer = new Player({
                name: 'Player 2',
                figure: 'circle',
                turn: false
            });

            let game = new Game([firstPlayer, secondPlayer]);
            document.body.appendChild(game.canvas);
        },
        template: ''
    })
};