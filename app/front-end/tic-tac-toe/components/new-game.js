module.exports = function(app) {
    let template = require('../templates/new-game.html');
    app.component('newGame', {
        controller: function (randomId) {
            this.id = randomId.getId()
        },
        template: template
    })
}