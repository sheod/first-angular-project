var express = require('express'),
    app = express();

app.use(express.static('../app'));

app.listen(8080);


app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: '../app'});
});