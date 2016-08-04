module.exports = function(app) {

    app.config(($locationProvider, $stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/404');
        $urlRouterProvider.when('/', '/tic-tac-toe');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('404', {
                url:'/404',
                template: `asdasdd`
            })
            .state('tic-tac-toe', {
                url: '/tic-tac-toe',
                template: `<new-game></new-game>`
            })
            .state('tic-tac-toe-new-game', {
                url: '/tic-tac-toe/:id',
                template: `<tic-tac-toe></tic-tac-toe>`
            })
    })
};