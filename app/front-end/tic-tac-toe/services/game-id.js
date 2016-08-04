module.exports = function(app) {
    
    app.service('randomId', function() {
        this.getId = () => {
            return Math.round(Math.random() * (100 - 1) + 1);
        }
    })
};