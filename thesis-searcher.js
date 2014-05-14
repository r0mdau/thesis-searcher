var express = require('express');
var app = express();

/* On utilise les cookies et les sessions */
app.use(express.cookieParser())
.use(express.session({secret: 'todosecret'}))
.use(express.bodyParser())

/* On affiche la todolist et le formulaire */
.get('/', function(req, res) {
    res.render('index.ejs', '');
})

/* Autoriser l'accès aux ressources des modules externes */
.use(express.static(__dirname, '/modules'))

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/');
})

.listen(8080);
