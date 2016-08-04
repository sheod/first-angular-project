module.exports = function(app) {
    require('./services')(app);
    require('./components')(app);
}