module.exports = function(app) {
    let template = require('../templates/form.html');

    app.component('signInFrom', {
        template: template
    })
}