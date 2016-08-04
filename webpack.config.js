'use strict';

const NODE_ENV = process.env.NODE_ENV || 'dev';

const webpack = require('webpack');


module.exports = {
    //context: __dirname + '/app',

    entry: {
        frontEnd: './app/front-end',
        ticTacToe: './app/front-end/tic-tac-toe/game'
    },
    
    output: {
        path: __dirname + '/app',
        filename: '[name].js',
        library: '[name]'
    },

    watch: NODE_ENV == 'dev', //автоматическа пересборка

    watchOptions: {
        aggregateTimeout: 1
    },

    devtool: NODE_ENV == 'dev' ? "inline-source-map" : null,//ошибки показываются в исходных файлах

    plugins: [
        new webpack.NoErrorsPlugin(), // если возник ошибки при сборки, вебпак не будет создавать файлы сборки
        new webpack.EnvironmentPlugin('NODE_ENV'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2, // минимум 2 одинаковые точки входа
            //chunks: [], // название точек в   хода
        })
    ],


    resolve: { //для модулей
        modulesDirectories: ['node_modules'], //указывает где икать модули, если не указан путь
        extensions:         ['', '.js']
    },

    resolveLoader: { //для loader
        modulesDirectories: ['node_modules'],
        moduleTemplates:    ['*-loader', '*'], // поиск по названию
        extensions:         ['', '.js']
    },

    module: {

        loaders: [
            {
              test: /\.html/,
              loader: 'html',
              exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    //plugins: ['transform-runtime']
                },
                exclude: /(node_modules|bower_components)/,
            }
        ]

    }

};
// минификатор
if (NODE_ENV == 'prod') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}




//babel | npm i babel-loader babel-core babel-preset-es2015 babel-plugin-transform-es2015-modules-commonjs

//webpack --display-modules -v информация о сборке
//webpack --json --profile >stats.json webpack.github.io/analyse/ графическое представление