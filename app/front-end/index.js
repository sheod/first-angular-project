'use strict'

let angular = require('angular');
let uiRouter = require('angular-ui-router');

let app =  angular.module('myApp', [uiRouter]);

require('./routing')(app);
require('./sign-in')(app);
require('./tic-tac-toe')(app);


